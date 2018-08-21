var setSchema = (col) => {
	const { buildSchema } = require('graphql');
	skills = ``;
	for (c = 0; c < col.length; c++) {
		skills = skills + `${col[c].replace(/\s+/g,'')}: Boolean\n`;
	}
var schema = buildSchema(`
	schema {
		query: Query
		mutation: Mutation
	}
	type Query {
		staff(id: String!): Staff
		skill: [Staff]
	}

	type Mutation{
		addStaff(input:StaffInput): Staff
	}
	input StaffInput{
		id: String!
		name:String
		age: Int
		skilltable: [LocationInput]
		}
	input LocationInput{
		Master: StaffInput!
		Location: String
		trades: [TradeInput]
	}
	input TradeInput{
		Trade: String
		specialities: [SpecialityInput]
	}
	input SpecialityInput{
		Speciality: String!
		skills: SkillInput
		}
	input SkillInput{
		${skills}
		From: Int
		To: Int
	}

	type Staff{
		id: String!
		name: String
		age: Int
		skilltable: [Location]
		}
	type Location{
		Master: Staff!
		Location: String
		trades: [Trade]
	}
	type Trade{
		Trade: String
		specialities: [Speciality]
	}
	type Speciality{
		Speciality: String!
		skills: Skill
		}
	type Skill{
		${skills}
		From: Int
		To: Int
	}
`);
return schema;
}

module.exports = setSchema;
