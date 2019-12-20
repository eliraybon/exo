const planetImg = [
  "https://exoplanets.nasa.gov/system/resources/detail_files/130_PIA17004.jpg",
  "https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2017/04/21/kepler-22b.jpg",
  "https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2017/08/04/psr-b125712.jpg",
  "https://cdn.spacetelescope.org/archives/images/screen/heic1619a.jpg",
  "https://i.pinimg.com/originals/ea/d5/b2/ead5b265f2f619502678cb6cd447da21.png",
  "https://i.pinimg.com/originals/fa/dc/9a/fadc9a4afb0dd8373101fe209340cc4e.png",
  "https://i.pinimg.com/originals/cf/d3/8d/cfd38d77c3da3d19884a2b19dec4fcf9.png",
  "https://i.pinimg.com/originals/3a/2a/f5/3a2af53859bbad5a0cbff4ba501f02c6.png",
  "https://i.pinimg.com/originals/26/72/3a/26723a96b4216766daba5d831a6c0443.jpg",
  "https://i.pinimg.com/originals/e1/82/4e/e1824e6ef8acc5e73e0a4501b205f585.jpg",
  "https://i.pinimg.com/originals/19/ee/34/19ee3484554a5cf6ba6322108fdd178d.jpg"
];

const starImg = [
  "https://www.davidreneke.com/wp-content/uploads/2013/04/Blue-Giant.jpg",
  "https://asd.gsfc.nasa.gov/blueshift/wp-content/uploads/2017/07/magnetar_glitch-1024x576.jpg",
  "https://scitechdaily.com/images/Neutron-Star-Artists-Rendering-777x464.jpg",
  "https://live.staticflickr.com/5555/14773475650_72d11fd8dc_b.jpg",
  "https://i.cbc.ca/1.4268586.1504110686!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/binary-nova.jpg",
  "https://cdn.vox-cdn.com/thumbor/aZZ6vNXaNHP5iFUiDb3YhQsrce0=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9607275/eso1735a.jpg",
  "https://cdn.cnn.com/cnnnext/dam/assets/161216110333-16-nasa-exoplanet-artist-renderings-super-169.jpg",
  "https://s.hdnux.com/photos/11/06/00/2383879/9/920x920.jpg",
  "https://i1.wp.com/manyworlds.space/wp-content/uploads/2019/03/534091main_pia13994-43_full_0-1-e1508776778843.jpeg?ssl=1",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/RedDwarfNASA-hue-shifted.jpg/1551px-RedDwarfNASA-hue-shifted.jpg"
];

const suitImg = [
  "https://external-preview.redd.it/zHEaBw6yhQGZJkk6XBUsYJpixblvZKRyUcTWLNRyJs8.jpg?auto=webp&s=c277aa10ff477ebbd0b0ff3b9ca9c7740594517a",
  "https://cdna.artstation.com/p/assets/images/images/013/002/864/large/luca-nemolato-final-1.jpg?1537570728",
  "https://cdnb.artstation.com/p/assets/images/images/006/235/695/large/tomas-ciger-eniac-3-spacesuit-concept-zzz.jpg?1497006102",
  "https://i.pinimg.com/736x/56/09/c4/5609c463f9c371beefa145e039d8cbaf.jpg",
  "https://cdnb.artstation.com/p/assets/images/images/014/938/601/large/cody-shay-armor-breakdown-back-combined-layers-2.jpg?1546397275&dl=1",
  "https://live.staticflickr.com/1897/42544609710_f11cd6b766_b.jpg",
  "https://i.pinimg.com/originals/50/0e/37/500e3705c58e2d493813b495ee4f80ff.jpg",
  "https://images.squarespace-cdn.com/content/v1/57d9c245b8a79b0b52cddcfd/1555625847989-N1ESGZB4RFE4A3E3OUBZ/ke17ZwdGBToddI8pDm48kFYMRW2vSkI2W5kHbca5E8Z7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UX37RvNLZQ7RsgDMYvOPJBhn3qZDbImWwzmTz1xtygkoU1wGFXxeb9TTmTQjM24QOg/NS-V+Spacesuit+concept_SD.jpg?format=2500w",
  "https://cdna.artstation.com/p/assets/images/images/006/108/462/large/natacha-collet-00.jpg?1511955833",
  "https://i.pinimg.com/originals/14/01/25/1401258a29970439ff0bc842825820c8.jpg"
];

const shipImg = [
  "https://img5.goodfon.com/wallpaper/nbig/3/99/concept-art-science-fiction-transport-vehicles-transport-v-1.jpg", 
  "https://i.ytimg.com/vi/j8BATJnH5Zw/maxresdefault.jpg", 
  "https://cdna.artstation.com/p/assets/images/images/012/598/288/large/alex-lukianov-ship1-1.jpg?1535573683", 
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bf13a400-4d2b-4e4e-8f94-7b9dfcea9b39/d4ivmm7-e13ca5a5-03cc-42ad-9fc6-cbbecd2e3fb0.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JmMTNhNDAwLTRkMmItNGU0ZS04Zjk0LTdiOWRmY2VhOWIzOVwvZDRpdm1tNy1lMTNjYTVhNS0wM2NjLTQyYWQtOWZjNi1jYmJlY2QyZTNmYjAuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.fsOQLNXlvZ0udZ5HXYvp5iQy470xxzDNK81n9aopxRc", 
  "https://i.pinimg.com/originals/38/45/3a/38453ad4b0eade7aa737a1efb21dac64.png", 
  "https://i.pinimg.com/originals/d9/19/d0/d919d00eaa0f76bdd431dbb4d603b321.jpg", 
  "https://i.pinimg.com/originals/10/a5/25/10a52531a1627223ea87414f6402b03b.jpg", 
  "https://cdna.artstation.com/p/assets/images/images/000/672/976/large/adam-burn-fortress-class.jpg?1430429016", 
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bf13a400-4d2b-4e4e-8f94-7b9dfcea9b39/d5c4em6-904ae866-34ad-4a37-9e6a-b49b650243d2.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JmMTNhNDAwLTRkMmItNGU0ZS04Zjk0LTdiOWRmY2VhOWIzOVwvZDVjNGVtNi05MDRhZTg2Ni0zNGFkLTRhMzctOWU2YS1iNDliNjUwMjQzZDIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.luuNbjWGSqw0SMKsyH4ofQ5eciQWvSi5ZpC9HSKrzUM", 
  "http://pre02.deviantart.net/c4ba/th/pre/f/2009/360/3/1/heavy_cruiser_sieger_by_karanak.jpg", 
  "https://i.pinimg.com/originals/d9/19/d0/d919d00eaa0f76bdd431dbb4d603b321.jpg"
];

const foodImg = [
  "https://loveincorporated.blob.core.windows.net/contentimages/gallery/8cdd9f68-620a-47d7-adea-47453e4f5951-1295331a-f0e3-48fc-b5db-0b942438885f-shutterstock_1149407921.jpg",
  "https://img.travelawaits.com/filter:centercrop/quill/5/a/3/c/b/1/5a3cb12fc1868ed49946dc9f1810f7a67e0d0acc.jpg?w=800&h=800",
  "https://www.grossmontcenter.com/wp-content/uploads/shutterstock_697347319.jpg",
  "https://simply-delicious-food.com/wp-content/uploads/2017/10/easy-tomato-cream-rigatoni-3.jpg",
  "https://simply-delicious-food.com/wp-content/uploads/2017/09/soy-honey-noodle-salad-meal-prep-2.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKtrcEufRTfDjfWeXxDbY2gA30fdkdBiArVJWLSWGBLTRupmUc&s",
  "https://i.pinimg.com/originals/68/bf/05/68bf058654d25173aafb0de1e7bb7c01.jpg",
  "https://images.pexels.com/photos/1026654/pexels-photo-1026654.jpeg?cs=srgb&dl=curry-delicious-food-delicious-indian-food-indian-cuisine-1026654.jpg&fm=jpg",
  "http://cdn.cnn.com/cnnnext/dam/assets/140430115517-06-comfort-foods.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH611LrI8OJKQB0YZqFE5P-de9ddCfeqKvekw8XCLM-eNDuJie&s"
]

module.exports = {
  planetImg,
  starImg,
  shipImg,
  suitImg,
  foodImg
}