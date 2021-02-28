import { Request, Response } from 'express';
import { resolve } from 'path';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UsersRepository } from '../repositories/UsersRespository';
import SendMailService from '../services/SendMailService';

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveyUserRepository)

        const user = usersRepository.findOne({ email })

        if (!user) {
            response.status(400).json({
                error: "user does not exists"
            })
        }

        const survey = surveysRepository.findOne({ id: survey_id })

        if (!survey) {
            response.status(400).json({
                error: "Survey does not exists"
            })
        }


        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        const surveyUserAlreadExists = await surveysUsersRepository.findOne({
            where: { user_id: (await user).id, value: null },
            relations: ["user", "survey"]
        });

        const variables = {
            name: (await user).name,
            title: (await survey).title,
            description: (await survey).description,
            id: (await user).id,
            link:process.env.URL_MAIL
        };

        if (surveyUserAlreadExists) {
            variables.id = surveyUserAlreadExists.id
            await SendMailService.execute(email, (await survey).title, variables, npsPath)
            return response.json(surveyUserAlreadExists)
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: (await user).id,
            survey_id,
        });



        await surveysUsersRepository.save(surveyUser);
        variables.id = surveyUser.id;



        await SendMailService.execute(email, (await survey).title, variables, npsPath)

        return response.json(surveyUser)
    }


}

export { SendMailController }