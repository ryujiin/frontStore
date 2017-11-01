import trae from 'trae'
import configService from './config'

const lovizApiService = trae.create({
  baseUrl: configService.apiUrl
})

export default lovizApiService
