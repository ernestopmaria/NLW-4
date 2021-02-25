import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UsersRepository } from '../repositories/UsersRespository';

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveyUserRepository)

        const userAlreadyExists = usersRepository.findOne({ email })

        if (!userAlreadyExists) {
            response.status(400).json({
                error: "user does not exists"
            })
        }

        const surveyAlreadExists = surveysRepository.findOne({ id: survey_id })

        if (!surveyAlreadExists) {
            response.status(400).json({
                error: "Survey does not exists"
            })
        }
        const surveyUser = surveysUsersRepository.create({
            user_id: (await userAlreadyExists).id,
            survey_id,
        })
        await surveysUsersRepository.save(surveyUser)

        return response.json(surveyUser)
    }


}

export { SendMailController }