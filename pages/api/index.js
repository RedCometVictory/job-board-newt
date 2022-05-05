let API_KEY = process.env.NEXT_PUBLIC_API_KEY
export default async function handler (req, res) {
  let { search, sort, location, remote, empType, page } = JSON.parse(req.body);
  let apiUrl = "https://findwork.dev/api/jobs?";
  if (!page) page = 1;
  try {
    let query = '';
    if (search) {
      // search = search.trim().replace(/ /g, "+");
      search = search.trim().replace(/\s/g, "+");
      query += `&search=${search}`;
    };
    // relevance default
    if (sort) query += `&order_by=${sort}`;
    if (location) {
      location = location.trim().replace(/\s/g, "+");
      query += `&location=${location}`;
    };
    if (remote) query += `&remote=${remote}`
    if (empType) query += `&employment_type=${empType}`;
    if (page) query += `&page=${page}`;
    if (query.length) query = query.substring(1); // start after first '&'

    let data = await fetch(`${apiUrl}${query}`, {
      headers: {
        Authorization: `Token ${API_KEY}`
      }
    });

    let json = await data.json();
    res.status(200).json(json);
  } catch (err) {
    res.status(500).json({ err })
  }
}