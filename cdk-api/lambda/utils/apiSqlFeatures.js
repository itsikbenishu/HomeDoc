class APISQLFeatures {
  constructor(DB, table, queryString) {
    this.DB = DB;
    this.table = table;
    this.queryString = queryString;
    this.page = "";
    this.offset = "";
    this.orderBy = "";
    this.fields = "*";
    this.where = "";
    this.query = "";
  }

  makeQuery() {
    this.query = `SELECT ${this.fields} 
                    FROM "${this.table}" 
                        ${this.where} 
                        ORDER BY ${this.orderBy} 
                        ${this.page} ${this.offset}`;

    return this;
  }

  async execute() {
    const result = await this.DB.execute(this.query);
    return result;
  }

  #formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString();
  }

  filter() {
    const operators = {
      gte: ">=",
      gt: ">",
      lte: "<=",
      lt: "<",
      eq: "=",
      ILIKE: `ILIKE`,
      LIKE: `LIKE`,
    };

    const queryObject = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((elem) => delete queryObject[elem]);

    this.where =
      ` where ` +
      Object.entries(queryObject).reduce((acc, [key, value]) => {
        const match = key.match(/^(.+)\[\$(.+)]$/); // field[$operatorKey]
        if (match) {
          const field = match[1];
          const operatorKey = match[2];
          const operator = operators[operatorKey];

          if (operatorKey === "date" || operatorKey === "wildcard") {
            return acc + "";
          }
          if (!operator) {
            throw new Error(`Unknown operator ${operatorKey}`);
          }

          let fieldValue = value;
          let datePosition = queryObject[`${field}[$date]`] || "";
          let wildcardPosition = queryObject[`${field}[$wildcard]`] || "both";

          if (datePosition === "true") {
            fieldValue = formatDate(fieldValue);
          }

          if (
            (operator === "ILIKE" || operator === "LIKE") &&
            !fieldValue.includes("%")
          ) {
            if (wildcardPosition === "start") {
              fieldValue = `%${fieldValue}`;
            } else if (wildcardPosition === "end") {
              fieldValue = `${fieldValue}%`;
            } else if (wildcardPosition === "both") {
              fieldValue = `%${fieldValue}%`;
            }
            fieldValue = `'${fieldValue}'`;
          }

          return acc + `"${field}" ${operator} ${fieldValue} AND`;
        } else {
          return acc + ` "${key}"='${value}' AND`;
        }
      }, "");

    if (this.where.endsWith(" AND")) {
      this.where = this.where.slice(0, -4);
    }
    if (this.where === ` where `) {
      this.where = "";
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort
        .split(",")
        .map((field) => {
          if (field.startsWith("-")) {
            return `"${field.slice(1)}" DESC`;
          }
          return `"${field}" ASC`;
        })
        .join(", ");

      this.orderBy = sortBy;
    } else {
      this.orderBy = `"createdAt" DESC`;
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields
        .split(",")
        .map((field) => `"${field}"`)
        .join(`, `);

      this.fields = fields;
    } else {
      this.fields = `*`;
    }

    return this;
  }

  paginate() {
    const defaultPaginateLimit = 25;
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || defaultPaginateLimit;
    const offset = (page - 1) * limit;

    this.offset = `OFFSET ${offset}`;
    this.page = `LIMIT ${limit}`;

    return this;
  }
}

module.exports = APISQLFeatures;
