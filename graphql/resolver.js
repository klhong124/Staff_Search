var setResolver = (database) => {
	//Resolver Details
	var getStaff = (args) => {
		return database.filter(data => {
			return data.id === args.id
		})[0];
	};
	class NewStaff {
		constructor(input) { this.input = input; }
		id() { return this.input.id }
		name() { return this.input.name; }
		age() { return this.input.age; }
		skilltable() { return this.input.skilltable; }
	};
	var getallStaff = () => {
		return database;
	}
	//Resolver
		resolver = {
			staff: getStaff,
			addStaff: ({input}) => { return new NewStaff(input); },
			skill: getallStaff
		};
	return resolver
	}
module.exports = setResolver;
