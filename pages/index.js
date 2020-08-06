import Airtable from 'airtable';

export default function Home({ data }) {
  return (
    <div>
      {data.map(({ name, ticker, buyOrSell }) => (
        <p>{`${name} ${ticker} ${buyOrSell}`}</p>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
  const database = airtable.base(process.env.AIRTABLE_BASE_ID)('Submissions');

  const records = await database.select().all();
  const data = records.map((record) => ({
    name: record.get('Name'),
    ticker: record.get('Ticker'),
    buyOrSell: record.get('Buy or Sell?'),
  }));

  return { props: { data } };
}
