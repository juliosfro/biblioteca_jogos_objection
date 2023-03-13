import {
    Ability, Subject
} from '@casl/ability';

import Usuario from '~/domains/usuarios/model';
import { createUserRules } from '~/domains/usuarios/users-rules';

export class AppAbility extends Ability<[App.Permission.Action, App.Permission.Subject]> {

}

/**
 * Mapeia o tipo do "subject" passado para o `can` ou para o `throwUnlessCan`, para a Classe do Modelo
 * ou uma String customizada.
 */
export const detectSubjectType = (subject: Subject) => {
    // se for uma String, então significa que é um subject customizado
    if (typeof subject === 'string') {
        return subject;
    }
    // se for um objeto com `modelName`, então significa que é um objeto com valores e um nome customizado.
    if (subject.modelName) {
        return subject.modelName;
    }
    // se o subject foi uma instância de um modelo do MikroOrm ou qualquer outra Classe então retorna
    // o nome da classe.
    if (subject.constructor) {
        return subject.constructor.name;
    }
    return subject;
};

export const createAbility = (user: Usuario) => {
    const rules = createUserRules(user);
    const ability = new AppAbility(rules, {
        detectSubjectType,
    });

    return ability;
};
