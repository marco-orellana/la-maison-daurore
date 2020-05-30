'use-strict'

const HOST = 'https://maison-aurore-api.herokuapp.com'
//const HOST = 'http://localhost:8080'
const jwt = require('jwt-simple')
const secret = 'xxx'

const phoneIsValid = (t) => {
    const regex = /\ /g;
    const nbesp = t.split(' ').length - 1;
    if(t !== null && t.length === 14 && nbesp === 1){
        return true
    }else return false
}

// TOKEN Encoder and decoder
const decodeData = (token) => {
    return jwt.decode(token, secret)
}

const encodeData = (value) => {
    return jwt.encode(value, secret)
}

const validateEmail = (email) => {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return !!mailformat.test(email)
}

const checkIfEmailExist = (email, callBack) => {
    fetch(HOST + '/logins/search/' + email)
        .then(response => response.json())
        .then(data => {
            callBack(data.success)
        })
        .catch()
}

const authLogin = (email, password, callBack) => {
    const userToSend = {
        email: email,
        password: password
    }
    fetch(HOST + '/auth/login', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userToSend)
    })
        .then(response => response.json())
        .then(data => {
            callBack(data)
        })
}

const logOutUser = () => {
    fetch(HOST + '/auth/logout', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
        })
}

const getCurrentUser = (token, callBack) => {
    fetch(HOST + '/auth/user', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetch(HOST + '/roles/' + data.data.id_role, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                })
                    .then(response => response.json())
                    .then(data2 => {
                        data.data.role = data2.data.title
                        callBack(token, data)
                    })
            } else {
                callBack(data, '')
            }
        })
}

const addUser = (params, callBack) => {
    fetch(HOST + '/roles', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + params.token
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const find = data.data.filter(role => role.title === params.role_title)
                if (find[0]) {
                    const user = {
                        id_role: find[0]._id,
                        first_name: params.first_name,
                        last_name: params.last_name,
                        sex: params.sex,
                        contact: params.contact
                    }

                    fetch(HOST + '/users', {
                        method: 'post',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + params.token
                        },
                        body: JSON.stringify(user)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                const userLogin = {
                                    id_user: data.data._id,
                                    email: params.email,
                                    password: params.password,
                                    is_active: params.is_active
                                }

                                fetch(HOST + '/logins', {
                                    method: 'post',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + params.token
                                    },
                                    body: JSON.stringify(userLogin)
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        callBack(data.success)
                                    })
                            }
                        })
                } else callBack(false)
            } else callBack(false)
        })
}

const registerSaveUser = (user, userLogin, callBack) => {
    fetch(HOST + '/users', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data1 => {
            if (data1.success) {
                userLogin.id_user = data1.data._id

                fetch(HOST + '/logins', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userLogin)
                })
                    .then(response => response.json())
                    .then(data2 => {
                        callBack(data2.success, data1.data._id)
                    })
            }
        })
}

const saveChild = (child, callBack) => {
    fetch(HOST + '/users', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(child)
    })
        .then(response => response.json())
        .then(data => {
            callBack(data)
        })
}

const saveChildren = (childrens, idParent, callBack) => {
    childrens.map(child => {
        child.id_parent = [idParent]
        fetch(HOST + '/users', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(child)
        })
            .then(response => response.json())
            .then(data => {
                callBack(data)
            })
    })
}


const getRolesAndDays = (callBack) => {
    fetch(HOST + '/roles')
        .then(response => response.json())
        .then(dataRoles => {
            fetch(HOST + '/days')
                .then(response => response.json())
                .then(dataDays => {
                    callBack(dataRoles.data, dataDays.data)
                })
        })
}

const getDays = (callBack) => {
    fetch(HOST + '/days')
        .then(response => response.json())
        .then(dataDays => {
            callBack(dataDays.data.filter(x => (x.title !== 'samedi' && x.title !== 'dimanche')))
        })
}

const deleteLogin = (token, idLogin, callBack) => {
    fetch(HOST + '/logins/' + idLogin, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
        })
}

const getImage = (token, id, callBack) => {
    fetch(HOST + '/users/' + id + '/photo', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            callBack(data)
        })
}

const getUser = (token, id, callBack) => {
    fetch(HOST + '/users/' + id, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            const templateUser = require('./variables').variables.templateUser
            const userTemplate = {
                ...templateUser,
                ...data.data
            }
            userTemplate.medical_info = (userTemplate.medical_info.length === 0) ? templateUser.medical_info : userTemplate.medical_info
            userTemplate.school_info = (userTemplate.school_info.length === 0) ? templateUser.school_info : userTemplate.school_info
            userTemplate.authorization = (userTemplate.authorization.length === 0) ? templateUser.authorization : userTemplate.authorization
            userTemplate.interest = (userTemplate.interest.length === 0) ? templateUser.interest : userTemplate.interest
            userTemplate.question = (userTemplate.question.length === 0) ? templateUser.question : userTemplate.question
            userTemplate.involvement = (userTemplate.involvement.length === 0) ? templateUser.involvement : userTemplate.involvement
            userTemplate.membership = (userTemplate.membership.length === 0) ? templateUser.membership : userTemplate.membership
            userTemplate.contact = (userTemplate.contact.length === 0) ? templateUser.contact : userTemplate.contact
            callBack(userTemplate)
        })
}

const getAllUsers = (token, callBack) => {
    fetch(HOST + '/roles', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(dataRoles => {
            fetch(HOST + '/logins', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .then(response => response.json())
                .then(dataLogins => {
                    fetch(HOST + '/users', {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            const dataUsers = []
                            for (let i = 0; i < data.data.length; i++) {
                                const user = data.data[i]
                                const templateUser = require('./variables').variables.templateUser
                                const userTemplate = {
                                    ...templateUser,
                                    ...user
                                }
                                userTemplate.medical_info = (userTemplate.medical_info.length === 0) ? templateUser.medical_info : userTemplate.medical_info
                                userTemplate.school_info = (userTemplate.school_info.length === 0) ? templateUser.school_info : userTemplate.school_info
                                userTemplate.authorization = (userTemplate.authorization.length === 0) ? templateUser.authorization : userTemplate.authorization
                                userTemplate.interest = (userTemplate.interest.length === 0) ? templateUser.interest : userTemplate.interest
                                userTemplate.question = (userTemplate.question.length === 0) ? templateUser.question : userTemplate.question
                                userTemplate.involvement = (userTemplate.involvement.length === 0) ? templateUser.involvement : userTemplate.involvement
                                userTemplate.membership = (userTemplate.membership.length === 0) ? templateUser.membership : userTemplate.membership
                                userTemplate.contact = (userTemplate.contact.length === 0) ? templateUser.contact : userTemplate.contact

                                const login = dataLogins.data.filter(dl => dl.id_user === userTemplate._id)
                                const role = dataRoles.data.filter(dr => dr._id === userTemplate.id_role)
                                userTemplate.idLogin = login[0] ? login[0]._id : null
                                userTemplate.isValid = login[0] ? login[0].is_active : null
                                userTemplate.email = login[0] ? login[0].email : null
                                let img = null
                                fetch(HOST + '/users/'+ userTemplate._id +'/photo', {
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + token
                                    }
                                })
                                    .then(response => response.json())
                                    .then(dataImage => {
                                        userTemplate.img = dataImage.success ? dataImage.data : ''
                                        userTemplate.id_classroom = userTemplate.id_classroom === null ? '12345' : userTemplate.id_classroom
                                        userTemplate.roleTitle = role[0].title
                                        dataUsers.push(userTemplate)

                                        callBack(dataUsers)
                                    })
                            }
                        })
                })
        })
}

const deleteAllUser = (token) => {
    const roles = require('./variables').variables.roles
    let superAdmin = null
    fetch(HOST + '/users', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {

            const users = data.data.filter(user => user.id_role !== roles.super_admin)
            superAdmin = data.data.filter(user => user.id_role === roles.super_admin)
            for (let j = 0; j < users.length; j++) {
                fetch(HOST + '/users/' + users[j]._id, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                })
            }
        })

        if(superAdmin !== null){
            fetch(HOST + '/logins', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .then(response => response.json())
                .then(dataLogins => {
                    for (let i = 0; i < dataLogins.data.length; i++) {
                        if(dataLogins.data[i].id_user !== superAdmin[0]._id){
                            fetch(HOST + '/logins/' + dataLogins.data[i]._id, {
                                method: 'DELETE',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                    Authorization: 'Bearer ' + token
                                }
                            })
                        }
                    }
                })
        }
}

const updateUserValidities = (token, users, callBack) => {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        fetch(HOST + '/logins/'+ user.idLogin, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({is_active: user.isValid})
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                getAllUsers(token, callBack)
            }
        })
    }
}

const updateUser = (token, user, callBack) => {
        fetch(HOST + '/users/'+ user._id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => { callBack(data) })
        .catch()
}

const updateUserEmail = (token, user, callBack) => {
    fetch(HOST + '/auth/update-email/', {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => { callBack(data) })
    .catch()
}

const updateUserPassword = (token, user, callBack) => {
    fetch(HOST + '/auth/update-password/', {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => { callBack(data) })
    .catch()
}

const updateUserProfile = (token, func, user, userEmail, userPassword, callBack) => {
    fetch(HOST + '/users/'+ user._id, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(dataUser => {
        if(func.email !== null){
            fetch(HOST + '/auth/update-email/', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify(userEmail)
            })
            .then(response => response.json())
            .then(dataEmail => {})
            .catch()
        }
        if(func.password !== null){
            fetch(HOST + '/auth/update-password/', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify(userPassword)
            })
            .then(response => response.json())
            .then(dataPassword => {})
            .catch()
        }
        callBack(user, userEmail, userPassword)
     })
    .catch()
}

const updateUserImage = (token, user, file, callBack) => {
    const formData = new FormData()
    formData.append("file", file[0])
        fetch(HOST + '/users/' + user._id + '/photo', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + token
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => { callBack(data) })
            .catch()
}

const getChildrens = (token, callBack) => {
    fetch(HOST + '/roles', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(dataRoles => {
            if(dataRoles.success) {
                const childRole = dataRoles.data.filter(x => x.title === 'children')[0]
                fetch(HOST + '/users', {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if(data.success) {
                            const childrens = data.data.filter(x => x.id_role === childRole._id)
                            callBack(childrens)
                        }
                    })
            }
        })
}

const getClassRooms = (token, callBack) => {

    fetch(HOST + '/classrooms', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(dataClassRoom => {
            fetch(HOST + '/roles', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .then(response => response.json())
                .then(dataRoles => {
                    if(dataRoles.success) {
                        const childRole = dataRoles.data.filter(x => x.title === 'children')[0]
                        fetch(HOST + '/users', {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + token
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                if(data.success) {
                                    const childrens = data.data.filter(x => x.id_role === childRole._id)
                                    callBack(dataClassRoom.data, childrens)
                                }
                            })
                    }
                })
        })
}

const getAllClassRooms = (token, callBack) => {

    fetch(HOST + '/classrooms', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(dataClassRoom => {
            callBack(dataClassRoom.data)
        })
}

const getClassRoomSchedules = (token, callBack) => {

    fetch(HOST + '/classroom-schedules', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            callBack(data.data)
        })
}

const updateClassRoom = (token, classroom, callBack) => {
        fetch(HOST + '/classrooms/'+ classroom._id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(classroom)
        })
        .then(response => response.json())
        .then(data => { callBack() })
        .catch()
}

const updateClassRoomSchedules = (token, classroomSchedule, callBack) => {
        fetch(HOST + '/classroom-schedules/'+ classroomSchedule._id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(classroomSchedule)
        })
        .then(response => response.json())
        .then(data => { callBack() })
        .catch()
}

const addClassRoom = (token, classroom, callBack) => {
        fetch(HOST + '/classrooms', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(classroom)
        })
        .then(response => response.json())
        .then(data => { callBack() })
        .catch()
}

const deleteClassRoom = (token, classroom, callBack) => {
    fetch(HOST + '/classrooms/' + classroom._id, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
    .then(response => {callBack(true)})
}

const getClassRoomsAndCollaborater = (token, callBack) => {
    fetch(HOST + '/classrooms', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(dataClassRoom => {
            fetch(HOST + '/users', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
                .then(response => response.json())
                .then(data => {
                    callBack(data.data)
                })
        })
}

const getRoles = (callBack) => {
    fetch(HOST + '/roles')
        .then(response => response.json())
        .then(dataRoles => {
            if(dataRoles.success){
                const id_collab_parent = (dataRoles.data.filter(role => role.title === 'collab_parent'))[0]._id
                callBack(dataRoles.data.filter(role => (role.title !== 'super_admin' && role.title !== 'collab_parent')), id_collab_parent)
            }
        })
}

const getAllSchedules = (token, callBack) => {
    fetch(HOST + '/schedules', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            callBack(data.data)
        }
    })
}

const getAllChildSchedules = (token, idChild, callBack) => {
    fetch(HOST + '/users/' + idChild + '/schedules', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            callBack(data.data)
        }
    })
}

const addSchedule = (token, schedule, callBack) => {
        fetch(HOST + '/schedules', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(schedule)
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                callBack()
            } else {
                console.log('error pendant la generation')
            }
        })
        .catch()
}

const deleteUser = (token, user) => {
    fetch(HOST + '/logins/' + user.idLogin, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })

    fetch(HOST + '/users/' + user._id, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
}

const getChildrenWhoHasClassroom = (token, callBack) => {
    fetch(HOST + '/roles?select=_id,title', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            const rolesColabs = (data.data.filter(x => x.title === 'children'))

            fetch(HOST + '/users?select=_id,first_name,last_name,id_role,id_collaborater', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(dataCollab => {
                if(dataCollab.success){
                    const childs = (dataCollab.data.filter(x => x.id_role === rolesColabs[0]._id))
                    callBack(childs.filter(x => x.id_classroom !== null))
                }
            })
        }
    })
}

const getAllCollaborater = (token, callBack) => {
    fetch(HOST + '/roles?select=_id,title', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            const rolesColabs = (data.data.filter(x => x.title === 'collaborater' || x.title === 'collab_parent'))
            fetch(HOST + '/users?select=_id,first_name,last_name,id_role', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(dataCollab => {
                if(dataCollab.success){
                    const collabs = (dataCollab.data.filter(x => x.id_role === rolesColabs[0]._id || x.id_role ===  rolesColabs[1]._id))
                    callBack(collabs)
                }
            })
        }
    })
}


const getAllChildren = (token, callBack) => {
    fetch(HOST + '/roles?select=_id,title', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            const rolesColabs = (data.data.filter(x => x.title === 'children'))
            fetch(HOST + '/users', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(dataChildren => {
                if(dataChildren.success){
                    const children = (dataChildren.data.filter(x => x.id_role === rolesColabs[0]._id))
                    callBack(children)
                }
            })
        }
    })
}

export default {
    phoneIsValid,
    encodeData,
    decodeData,
    authLogin,
    logOutUser,
    getCurrentUser,
    validateEmail,
    addUser,
    deleteLogin,
    getRolesAndDays,
    registerSaveUser,
    saveChildren,
    saveChild,
    getAllUsers,
    deleteAllUser,
    updateUserValidities,
    getAllSchedules,
    auth: {
        currentUser: getCurrentUser
    },
    schedule: {
        get: getAllSchedules,
        forChild: getAllChildSchedules,
        child: getChildrenWhoHasClassroom,
        add: addSchedule
    },
    user: {
        get: getUser,
        children: getAllChildren,
        getCollaborater: getAllCollaborater,
        update: updateUser,
        updateEmail: updateUserEmail,
        updatePassword: updateUserPassword,
        updateProfile: updateUserProfile,
        delete: deleteUser,
        onlyChild: getChildrenWhoHasClassroom
    },
    login: {
        checkIfExist: checkIfEmailExist,
        delete: deleteLogin,
        auth: authLogin
    },
    role:{
        get: getRoles
    },
    day: {
        get: getDays
    },
    image:{
        get: getImage,
        update: updateUserImage
    },
    classroom: {
        get: getClassRooms,
        getAll: getAllClassRooms,
        getSchedules: getClassRoomSchedules,
        update: updateClassRoom,
        updateSchedules: updateClassRoomSchedules,
        add: addClassRoom,
        delete: deleteClassRoom
    }
}
