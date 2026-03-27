// Utility to parse CSV text into array of objects
export function sheetParser(csvText) {
  const lines = csvText.split('\n').map(line => line.trim()).filter(Boolean);
  console.log("lines from CSV:", lines);


  if (lines.length === 0) return [];


  // Extract headers
  const headers = lines[0]
    .split(',')
    .map(h => h.trim().toLowerCase());
    console.log("Parsed Headers:", headers);

  // Parse rows
const data = lines.slice(1).map(line => {
    // Handle quoted CSV fields properly
    const values = [];
    let current = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
            values.push(current.trim().replace(/^"|"$/g, ''));
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current.trim().replace(/^"|"$/g, ''));

    const obj = {};
    headers.forEach((header, index) => {
        obj[header] = values[index] || '';
    });

    return {
        name: obj['name'],
        address: obj['address'],
        city: obj['city'],
        lat: parseFloat(obj['lat']) || null,
        longi: parseFloat(obj['lng']) || null,
        cuisine: obj['cuisine'],
        halalStatus: obj['halal_status'],
        phone: obj['phone'],
        website: obj['website'],
        timings: obj['hours']
    };
});
  console.log('Parsed Data:', data);

  return data;
}