 let src = 'https://randomuser.me/api/?results=18&inc=picture,name,gender,location,dob';
 const container = document.getElementById('container');
 let male = document.getElementById('male');
 let female = document.getElementById('female');
 let all = document.getElementById('all');
 let menu = document.getElementById('menu');
 let sorting;

 function render(arr) {
   arr.forEach(element => {
      let div = document.createElement('div');
      let foto = document.createElement('p');
      let name = document.createElement('p');
      let gender = document.createElement('p');
      let location = document.createElement('p');
      let age = document.createElement('p'); 
   div.id = 'div';
   foto.id = 'foto';
   name.id = 'name';
   gender.id = 'gender';
   location.id = 'location';
   age.id = 'age';

   foto.innerHTML = `<img src = "${element.picture.large}">`;
   name.innerHTML = element.name.first.charAt(0).toUpperCase() + element.name.first.substr(1).toLowerCase();
   gender.innerHTML = element.gender;
   location.innerHTML = 'City' + ' : ' + element.location.city.charAt(0).toUpperCase() + element.location.city.substr(1).toLowerCase();
   age.innerHTML =  'Age'+ ' : ' + element.dob.age;
   container.appendChild(div);
   div.append(foto, name, gender, location, age);
  })
 }

 window.onload = function() {
 
   fetch(src)
    .then(response => response.json())
    .then(data => {
      render(data.results);

      menu.addEventListener('click', el => {
      let div = document.querySelectorAll('div');
      div.forEach(element => {
         element.remove();
      });
//click on male
         if (el.target.id === 'male') {
            sorting = data.results.filter(element => {
               if(element.gender === 'male') return true ; 
         })
         render(sorting);
         } 
//click on female
         if(el.target.id === 'female') {
            sorting = data.results.filter(element => {
               if(element.gender === 'female') return true ; 
         })
         render(sorting);
         } 
//click on all
         if(el.target.id === 'all') render(data.results);

         if(el.target.id === 'az') render(data.results.sort(function (a,b) {
            if(a.name.first.toLowerCase()<b.name.first.toLowerCase()) return -1;
            if(a.name.first.toLowerCase()>b.name.first.toLowerCase()) return 1;
            return 0;
         })); 
//click on za
         if(el.target.id === 'za') render(data.results.sort(function (a,b) {
            if(a.name.first.toLowerCase()>b.name.first.toLowerCase()) return -1;
            if(a.name.first.toLowerCase()<b.name.first.toLowerCase()) return 1;
            return 0;
         })); 
//click on cres
         if(el.target.id === 'cres') render(data.results.sort(function (a,b) {
            if(a.dob.age < b.dob.age) return -1;
            if(a.dob.age > b.dob.age) return 1;
            return 0;
         })); 
//click on dim
         if(el.target.id === 'dim') render(data.results.sort(function (a,b) {
            if(a.dob.age > b.dob.age) return -1;
            if(a.dob.age < b.dob.age) return 1;
            return 0;       
         })); 
  })
 })
}
