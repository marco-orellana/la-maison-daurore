'use strict'
const variables = {
    days: {
        lundi: 'lundi',
        mardi: 'mardi',
        mercredi: 'mercredi',
        jeudi: 'jeudi'
    },
    role: {
        highAdmin: 'super_admin',
        admin: 'admin',
        parent: 'parent',
        collab: 'collaborater',
        both: 'collab_parent',
        child: 'children'
    },
    actors: {
        children: 'IJNDVFBHCD',
        collaborator: 'VBGNVGCHDNXD',
        parent: 'RGBGVBCHSN',
        both: 'TWGSDVCHEDJH',
        admin: 'UEHSDVHSB'
    },
    menus: {
        allUsers: 'DGFDVGSHBFNC',
        validation: 'DHGHICSJBISKHZ',
        createAccount: 'POKJHSFNCKD',
        classroomManagement: 'KJHGFVDGWHSNGDH',
        scheduleManagement: 'GDHVFBNCDHGN',
        historical: 'OEIUHGDVFBEJDHBFV',
        childList: 'UHNDBVDHNBN',
        childSchedule: 'OEIUHFGBCJES',
        collabSchedule: 'EHDFHMSHZNDBN',
        registerChild: 'OEIUYGDXVDBWNSJXN',
        profile: 'GESBVDBQUJA',
        prints: 'RWFFABWSMND',
        logOut: 'WIJSFBCHDS'
    },
    cookies: {
        user: 'APISID',
        token: 'RIKSGD',
        password: 'WRTHPLLOK',
        login: 'ODIUHFBC'
    },
    id: {
        loginRegister: {
            showLogin: 'loginRegister85421502',
            showRegister: 'loginRegisters54d1c5s'
        },
        login: {
            email: '5D2FC1ED5X2',
            password: 'EDF41C5S205SD'
        },
        registerStart: {
            check: {
                parent: '5S4D1CS5Z',
                collaborator: '8S51CS85D2X',
                both: 'E5SFC4S1ZC4S',
                children: 'URHDFNBNCD'
            }
        },
        createAdmin: {
            sex: 'RGDHGZHX',
            lastName: '8ED5F4C1D',
            firstName: 'E85SF41CS52',
            contactPersonal: 'IEUYGDFBGCH',
            contactWork: 'UEYGSDFGH',
            email: 'GESGNCBN',
            password: 'SHDGBCSJZ',
            confirmPassword: 'TGSVDCBHS',
            validation: 'E5S4F1CS52'
        },
        updateUser: {
            sex: 'updateUser8R5D4GF1VD5',
            female: 'updateUser8R5D4GF1VD51',
            male: 'updateUser8R5D4GF1VD52',

            last_name: 'updateUser8E5D4FDW185S',
            first_name: 'updateUserQ8W7E4F2S8D',
            email: 'updateUser9A62S41XC4D2F',
            address: 'updateUser5141428422',

            contacts: 'updateUserE85DF4CED521',
            personal: 'updateUserE85DF4CED5211',
            home: 'updateUserE85DF4CED5212',
            work: 'updateUserE85DF4CED5213',
            emergency: 'updateUserE85DF4CED5215',

            oldPassword: 'updateUserSHDGBCSJZ',
            newPassword: 'updateUserDGHGXFHCNS',
            newConfirmPassword: 'updateUserTGSVDCBHS'
        },
        register: {
            sex: '8R5D4GF1VD5',
            female: '8R5D4GF1VD51',
            male: '8R5D4GF1VD52',

            birthday: '7E4DE54F15ED2',
            last_name: '8E5D4FDW185S',
            first_name: 'Q8W7E4F2S8D',
            email: '9A62S41XC4D2F',
            address: '5141428422',

            contacts: 'E85DF4CED521',
            contacts_personal: 'E85DF4CED5211',
            contacts_home: 'E85DF4CED5212',
            contacts_work: 'E85DF4CED5213',
            contacts_emergency: 'E85DF4CED5215',

            is_subscribed: 'AS41XCS52DZ1',
            has_child: '9D6F4DX1S5D',

            membership: '8E5D4F1E5D',
            membership_becomeMember: '8E5D4F1E5D1',
            membership_alreadyMember: '8E5D4F1E5D2',
            membership_notWantMember: '8E5D4F1E5D3',
            membership_becomeMember_paymentMethod: '8E5D4F1E5D4',
            membership_becomeMember_memberCard: '8E5D4F1E5D5',
            membership_becomeMember_discountCard: '8E5D4F1E5D6'
        },
        childrenRegister: {
            identification: 'childrenRegisteridentification',
            sex: 'EGHSGNDVCFEGSVNBM',
            female: 'EGHSGNDVCFEGSVNBM1',
            male: 'EGHSGNDVCFEGSVNBM2',
            last_name: 'childrenRegisteridentification8E5D4FDW185S',
            first_name: 'childrenRegisteridentificationQ8W7E4F2S8D',
            birthday: 'childrenRegisteridentification7E4DE54F15ED2',
            garde: 'childrenRegisteridentification8R5D4F1E5D',
            gardeAll: 'childrenRegisteridentification8R5D4F1E5D1',
            gardeShared: 'childrenRegisteridentification8R5D4F1E5D2',
            gardeMother: 'childrenRegisteridentification8R5D4F1E5D3',
            gardeFather: 'childrenRegisteridentification8R5D4F1E5D4',
            gardeOther: 'childrenRegisteridentification8R5D4F1E5D5',
            gardeParentOptionYes: 'childrenRegisteridentificationFGDFG',
            gardeParentOptionNo: 'childrenRegisteridentification8G5FG24',
            gardeOtherOption: 'childrenRegisteridentification8G5FG24E5D24F',

            schoolInfo: 'childrenRegisterschoolInfo',
            school: 'childrenRegisterschoolInfoRDF415DX2',
            schoolLevel: 'childrenRegisterschoolInfoRDF415DX15',
            adlRegister: 'childrenRegisterschoolInfo5S41',
            lastRedoubleLevel: 'childrenRegisterschoolInfoRDF8Y5GF24G1',
            registerReason: 'childrenRegisterschoolInfoE8RT5U4',
            evaluation: 'childrenRegisterschoolInfo5FG42F1E',
            daycareService: 'childrenRegisterschoolInfoE9R8TY4H',
            daycareServiceYesName: 'childrenRegisterschoolInfoE9R8TY4H1',
            daycareServiceYesPhone: 'childrenRegisterschoolInfoE9R8TY4H2',

            medicalInfo: 'childrenRegistermedicalInfo',
            ramq: 'childrenRegistermedicalInforamq',
            expiration: 'childrenRegistermedicalInfoexpiration',
            allergies: 'childrenRegistermedicalInfoallergies',
            drug: 'childrenRegistermedicalInfodrug',
            othersInfos: 'childrenRegistermedicalInfoothersInfos',

            autorisation: 'childrenRegisterautorisation',
            autorisationPapper: 'childrenRegisterautorisation5D4F2',
            autorisationInternet: 'childrenRegisterautorisation9WE8R5H4B'

        },
        complementaryInformations: {
            expectations: 'expectationsDD2FDF4VF',
            expectationsVar: 'expectationsDD2FDF4VF1',

            needs: 'needshgfgdfv',
            needsVar: 'needshgfgdfv5421',

            involvement: 'implicationsR5DF42',
            availableFor: 'gehsjhdjhceyhs',
            talents: 'implicationsR5DF42U5H4J2',
            snacks: 'implicationsR5DF42SS4',
            organization: 'implicationsR5DF42ERGH',
            support: 'implicationsR5DF425FG42F1',
            otherInvolvement: 'implicationsR5DF428G5FGD4F'
        },
        collaboratorBenevoles: {
            availabilityInterest: 'availabilityInterest85d4c',
            availability: 'availabilityInterest85d4c1',
            monday: 'availabilityInterest85d4c11',
            tuesday: 'availabilityInterest85d4c12',
            wednesday: 'availabilityInterest85d4c13',
            thursday: 'availabilityInterest85d4c14',
            interest: 'availabilityInterest85d4c2',
            magicJournal: 'availabilityInterest85d4c21',
            serveSnack: 'availabilityInterest85d4c22',
            animationPreparation: 'availabilityInterest85d4c23',
            accompanyWorkshop: 'availabilityInterest85d4c24',
            prepareSnack: 'availabilityInterest85d4c25',
            accompanyInternet: 'availabilityInterest85d4c26',
            motivationExperience: 'motivationExperienceGSHGDH',
            motivation: 'motivationExperienceGSHGDH1',
            experience: 'motivationExperienceGSHGDH2',
            comment: 'motivationExperienceGSHGDH3',
            heard: 'motivationExperienceGSHGDH4'
        },
        registerPassword: {
            password: 'registerPasswordEDFSDWHS',
            confirmPassword: 'registerPasswordEDFSDWHU'
        }
    },
    templateUser: {
        id_role: null,
        id_child: [],
        id_parent: [],
        id_collaborater: null,
        id_classroom: null,
        first_name: null,
        last_name: null,
        sex: null,
        address: null,
        birthday: null,
        photo: 'no-photo.jpg',
        has_child: false,
        is_subscribed: false,
        contact: [{
            personal: null,
            work: null,
            home: null,
            emergency: null
        }],
        membership: [{
            status: false,
            payement_method: null,
            member_card: false,
            discount_card: false
        }],
        expectation: null,
        need: null,
        involvement: [
            {
                question: 'talents',
                response: 'Response here'
            },
            {
                question: 'snacks',
                response: null
            },
            {
                question: 'organization',
                response: null
            },
            {
                question: 'support',
                response: null
            },
            {
                question: 'otherInvolvement',
                response: null
            }
        ],
        comment: null,
        experience: null,
        motivation: null,
        availability: [],
        question: [
            {
                question: 'garde',
                response: null
            },
            {
                question: 'gardeParentOption',
                response: null
            },
            {
                question: 'gardeOtherOption',
                response: null
            },
            {
                question: 'heard',
                response: null
            }
        ],
        interest: [
            {
                question: 'magicJournal',
                response: null
            },
            {
                question: 'serveSnack',
                response: null
            },
            {
                question: 'animationPreparation',
                response: null
            },
            {
                question: 'accompanyWorkshop',
                response: null
            },
            {
                question: 'prepareSnack',
                response: null
            },
            {
                question: 'accompanyInternet',
                response: null
            }
        ],
        school_info: [{
            name: null,
            level: null,
            adl: false,
            redouble: null,
            evaluate: false,
            reason: null,
            educator_name: null,
            educator_phone: null
        }],
        medical_info: [{
            ramq: null,
            allergies: null,
            drugs: null,
            other_info: null
        }],
        authorization: [{
            paper: false,
            internet: false
        }]
    },
    roles: {
        super_admin: '5e6a3e314554933864b2c3c2',
        parent: '5e6a3e314554933864b2c3c5',
        collaborater: '5e6a3e314554933864b2c3c4',
        admin: '5e6a3e314554933864b2c3c3',
        children: '5e6a3e314554933864b2c3c6',
        collab_parent: '5e6a3e314554933864b2c3c7'
    }
}

module.exports = {
    variables
}
