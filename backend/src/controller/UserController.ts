import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRespository'

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body

        const usersRespository = getCustomRepository(UsersRepository)

        const userAlreadExistis = await usersRespository.findOne({
            email
        })
        if (userAlreadExistis) {
            return response.status(400).json({
                err: "User already exists"
            })
        }

        const user = usersRespository.create({
            name, email
        })

        await usersRespository.save(user)

        return response.status(201).json(user)
    }

    /*  async show(request: Request, response: Response) {
 
         const usersRepository = getCustomRepository(UsersRepository)
 
         const all = await usersRepository.find()
 
         return response.json(all)
 
     } */


}

export { UserController }