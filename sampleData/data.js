export const filterFields = [
  {name:'min_price',label:'Min Price (₹)',placeholder:'e.g. 100000' },
  {name:'max_price',label:'Max Price (₹)',placeholder:'e.g. 400000' },
  {name:'min_bedrooms',label:'Min Bedrooms',placeholder:'e.g. 2'},
  {name:'max_bedrooms',label:'Max Bedrooms',placeholder:'e.g. 4'},
];



export const defaultForm = {
  square_footage:'',
  bedrooms:'',
  bathrooms:'',
  year_built:'',
  lot_size:'',
  distance_to_city_center:'',
  school_rating:'',
};

export const fields = [
  { name: 'square_footage', type:"number",label: 'Square Footage',placeholder: 'e.g. 1800'},
  { name: 'bedrooms',type:"number",label: 'Bedrooms',placeholder: 'e.g. 3'},
  { name: 'bathrooms',type:"number",label: 'Bathrooms',placeholder: 'e.g. 2'},
  { name: 'year_built',type:"number",label: 'Year Built',placeholder: 'e.g. 2000' },
  { name: 'lot_size',type:"number",label: 'Lot Size (sq ft)',placeholder: 'e.g. 7500' },
  { name: 'distance_to_city_center',type:"number", label: 'Distance to City (miles)', placeholder: 'e.g. 5.0'},
  { name: 'school_rating',type:"number",label: 'School Rating (0-10)',placeholder: 'e.g. 8.0'},
];

