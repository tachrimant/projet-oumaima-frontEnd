import { Injectable } from "@angular/core";
import { AppStore } from "../app-store.service";

@Injectable({
    providedIn: 'root',
})
export class MenuInitService {
    constructor(
        private appStore: AppStore
    ){}
    menu = [
        {
            label: 'Home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
            ],
            roles: ['ALL']
        },
        {
            label: 'Communauté éducative',
            items: [
                {
                    label: 'Étudiants',
                    icon: 'pi pi-fw pi-id-card',
                    routerLink: ['/etudiant'],
                    roles: [
                        'DIRECTOR',
                        'SUPER_ADMIN',
                        'ADMINISTRATION',
                        'TEACHER'
                    ]
                },
                {
                    label: 'Professeurs',
                    icon: 'pi pi-briefcase',
                    routerLink: ['/professeur'],
                    roles: [
                        'DIRECTOR',
                        'SUPER_ADMIN',
                        'ADMINISTRATION'
                    ]
                },
                {
                    label: 'Personnel administratif',
                    icon: 'pi pi-user',
                    routerLink: ['/professeurs'],
                    roles: [
                        'DIRECTOR',
                        'SUPER_ADMIN'
                    ]
                },
            ],
            roles: [
                'DIRECTOR',
                'ADMINISTRATION',
                'TEACHER',
                'SUPER_ADMIN'
            ]
        },
    ]
    initMenu(menu) {
        const menuItems = menu ;
        this.appStore.getUser().subscribe(
            (user) => {
                console.log(user)
                console.log(menuItems)
                const roles = user.authorities;
                console.log(roles);
                menuItems.forEach(element => {

                        let intersection = element.roles.filter(x => roles.includes(x));
                        if(intersection.length) {
                            element.visible = true;
                            if(element.items.length) {
                                element.items.forEach(item => {

                                        let intersection = item.roles.filter(x => roles.includes(x));
                                        if(intersection.length) {
                                            item.visible = true;
                                        } else {
                                            item.visible = false;
                                        }

                                });
                            }
                        } else {
                            element.visible = false;
                        }

                });
            }
            )
        return menuItems;
    }



}
