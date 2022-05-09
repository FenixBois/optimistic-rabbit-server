const test = {
    tra: 'tsrat',
    tsnreaio: 'tnsreaio',
    debilek: [{ tnserai: 'tsnra' }, { tsratars: 'tnsreiao' }],
};

const test1 = { ...test, neio: [...test.debilek] };

console.log(test1);

const hello = {
    hi: 'tsrat',
    hoi: 'tsranetioarsn',
    ntsra: ['tsratrsa', { ho: 'tnsreiao' }],
};
const hello1 = { ...hello, ntsra: [...hello.ntsra, 'nomteirsoan'] };
console.log(hello1);
