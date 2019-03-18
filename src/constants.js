export const BLOOD_GROUP = [
    {
        id: 0,
        blood_group: 'Select Blood Group'
    },
    {
        id: 1,
        blood_group: 'A'
    },
    {
        id: 2,
        blood_group: 'B'
    },
    {
        id: 3,
        blood_group: 'AB'
    },
    {
        id: 4,
        blood_group: 'O'
    },
]

export const GENOTPYE = [
    {
        id: 0,
        genotype: 'Select Genotype'
    },
    {
        id: 1,
        genotype: 'AA'
    },
    {
        id: 2,
        genotype: 'AS'
    },
    {
        id: 3,
        genotype: 'AC'
    },
    {
        id: 4,
        genotype: 'SS'
    },
]

export const RELIGION = [
    {
        id: 0,
        religion: 'Select Religion'
    },
    {
        id: 1,
        religion: 'Christianity'
    },
    {
        id: 2,
        religion: 'Islam'
    },
    {
        id: 3,
        religion: 'Others'
    },
]

export const MARITAL_STATUS = [
    {
        id: 0,
        status: 'Select Status'
    },
    {
        id: 1,
        status: 'Single'
    },
    {
        id: 2,
        status: 'Married'
    },
    {
        id: 3,
        status: 'Divorced'
    },
    {
        id: 4,
        status: 'Widowed'
    },
];

export const BASE_URL = 'http://localhost:8000/api/v1/';

export const GetDate = (date: any) :string => {
    if (!date) {
        return '';
    }
    let newDate  = new Date(date);
    return  newDate.getUTCFullYear() +'-'+ (newDate.getMonth()+1) +'-'+ (newDate.getDate());
}

