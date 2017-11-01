import lovizApiService from './../lovizapi'

const lovizHeroService = {}

lovizHeroService.getHero = function (q) {
  return lovizApiService.get('/cms/hero_home/', {
    params: q
  })
    .then(res => res.data)
    .catch(err => err.data)
}
export default lovizHeroService
