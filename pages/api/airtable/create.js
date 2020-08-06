import Airtable from 'airtable';

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
const database = airtable.base(process.env.AIRTABLE_BASE_ID)('Submissions');

export default async (req, res) => {
  const { createList } = req.body;
  database.create(createList);
  return res.status(201);
};