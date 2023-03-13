import Usuario, { TipoUsuario } from './model';

function getAdministratorUserRules(usuario: Usuario): App.Permission.AbilityRule[] {
    return [
        {
            action: ['create','read', 'find', 'update', 'delete'],
            subject: Usuario.name,
            permissions: [
                usuario.perm_gerenciar_usuarios!,
            ],
        },
    ];
}

function getClientUserRules(usuario: Usuario): App.Permission.AbilityRule[] {
    return [
        {
            action: ['read', 'update'],
            subject: Usuario.name,
            conditions: {
                id: usuario?.id,
            },
        },
    ];
}

export function createUserRules(user: Usuario): App.Permission.AbilityRule[] {
    let rules: App.Permission.AbilityRule[];
    if (user.hasRole(TipoUsuario.ADMINISTRADOR)) {
        rules = getAdministratorUserRules(user);
    } else if (user.hasRole(TipoUsuario.CLIENTE)) {
        rules = getClientUserRules(user);
    } else {
        rules = [];
    }

    const grantedPermissions = rules
        .filter(rule => {
            if (!Array.isArray(rule.permissions)) {
                return true;
            }
            return rule.permissions.some(perm => {
                if (typeof perm === 'boolean') {
                    return perm;
                }
                if (typeof perm === 'string') {
                    return user.tipo === perm;
                }
                if (typeof perm === 'function') {
                    return perm(user);
                }
                return false;
            });
        })
        .map(r => {
            const rule = { ...r };
            delete rule.permissions;
            return rule;
        });

    return grantedPermissions;
}
