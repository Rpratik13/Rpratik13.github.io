var obj = {
  name: 'Pratik',
  address: 'Kathmandu',
  email: 'R.pratik013@gmail.com',
  interests: ['Coding', 'Music', '...'],
  education: [{ name: "AVM School", enrolledDate: 2006 },
    { name: "St. Xavier's College", enrolledDate: 2014 },
    { name: "Kathmandu University", enrolledDate: 2016 }]
}

var edu = obj.education;

for (var i = 0; i < edu.length; i++) {
  console.log("Name: " + edu[i].name + ", Date: " + edu[i].enrolledDate);
}