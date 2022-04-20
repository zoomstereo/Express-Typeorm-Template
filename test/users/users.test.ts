import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

import supertest from 'supertest';
import { expect } from 'chai';
import shortid from 'shortid';
import ServerSetup from '../../server';
import { connection } from '../../connection';


let firstUserIdTest = 0; // will later hold a value returned by our API
const firstUserBody = {
    firstName: 'TestUser',
    lastName: '69',
    email: `marcos.henrique_${shortid.generate()}@toptal.com`,
    password: 'Sup3rSecret!23',
    permissionFlags: 1
};

let accessToken = '';
let refreshToken = '';
const newFirstName = 'Jose';
const newFirstName2 = 'Paulo';
const newLastName2 = 'Faraco';

describe('users and auth endpoints', async function () {
    console.log("Describe inited")
    let server = new ServerSetup();
    let request: supertest.SuperAgentTest;

    before(async function () {
        await connection.create(true);
        request = supertest.agent(server.setUpServer());
    });

    after(async function () {
        await connection.close();
    });

    it('should allow a POST to /users', async function () {
        const res = await request.post('/users').send(firstUserBody);

        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('number');
        firstUserIdTest = res.body.id;
    });

    it('should allow a POST to /auth', async function () {
        const res = await request.post('/auth').send(firstUserBody);
        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.accessToken).to.be.a('string');
        accessToken = res.body.accessToken;
        refreshToken = res.body.refreshToken;
    });

    it('should allow a GET from /users/:userId with an access token', async function () {
        const res = await request
            .get(`/users/${firstUserIdTest}`)
            .set({ authorization: `Bearer ${accessToken}` })
            .send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('number');
        expect(res.body.id).to.equal(firstUserIdTest);
        expect(res.body.email).to.equal(firstUserBody.email);
    });
    // Nesting, Skipping, Isolating, and Bailing on Tests
    // Nested describe
    describe('with a valid access token', function () {
        it('should disallow a GET from /users', async function () {
            const res = await request
                .get(`/users`)
                .set({ Authorization: `Bearer ${accessToken}` })
                .send();
            expect(res.status).to.equal(403);
        });

        it('should disallow a PATCH to /users/:userId', async function () {
            const res = await request
                .patch(`/users/${firstUserIdTest}`)
                .set({ Authorization: `Bearer ${accessToken}` })
                .send({
                    firstName: newFirstName,
                });
            expect(res.status).to.equal(403);
        });

        it('should disallow a PUT to /users/:userId with an nonexistent ID', async function () {
            // Here is currently testing against a String id
            // TODO: Make a case where it test against an Number non existing ID
            const res = await request
                .put(`/users/i-do-not-exist`)
                //.put(`/users/999`)
                .set({ Authorization: `Bearer ${accessToken}` })
                .send({
                    email: firstUserBody.email,
                    password: firstUserBody.password,
                    firstName: 'Marcos',
                    lastName: 'Silva',
                    permissionFlags: 256,
                });
            expect(res.status).to.equal(404);
        });

        it('should disallow a PUT to /users/:userId trying to change the permission flags', async function () {
            const res = await request
                .put(`/users/${firstUserIdTest}`)
                .set({ Authorization: `Bearer ${accessToken}` })
                .send({
                    email: firstUserBody.email,
                    password: firstUserBody.password,
                    firstName: 'Marcos',
                    lastName: 'Silva',
                    permissionFlags: 256,
                });
            expect(res.status).to.equal(400);            
            expect(res.body.errors).to.be.an('array');
            expect(res.body.errors).to.have.length(1);
            expect(res.body.errors[0]).to.equal(
                'User cannot change permission flags'
            );
        });
        // TODO: Be carefull with this on production
        it('should allow a PUT to /users/:userId/permissionFlags/2 for testing', async function () {
            const res = await request
                .put(`/users/${firstUserIdTest}/permissionFlags/2`)
                .set({ Authorization: `Bearer ${accessToken}` })
                .send({});
            expect(res.status).to.equal(204);
        });

        describe('with a new set of permission flags', function () {
            it('should allow a POST to /auth/refresh-token', async function () {
                const res = await request
                    .post('/auth/refresh-token')
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send({ refreshToken });
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
                expect(res.body.accessToken).to.be.a('string');
                accessToken = res.body.accessToken;
                refreshToken = res.body.refreshToken;
            });

            it('should allow a PUT to /users/:userId to change first and last names', async function () {
                const res = await request
                    .put(`/users/${firstUserIdTest}`)
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send({
                        email: firstUserBody.email,
                        password: firstUserBody.password,
                        firstName: newFirstName2,
                        lastName: newLastName2,
                        permissionFlags: 2,
                    });                    
                expect(res.status).to.equal(204);
            });

            it('should allow a GET from /users/:userId and should have a new full name', async function () {
                const res = await request
                    .get(`/users/${firstUserIdTest}`)
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send();
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.an('object');
                expect(res.body.id).to.be.a('number');
                expect(res.body.firstName).to.equal(newFirstName2);
                expect(res.body.lastName).to.equal(newLastName2);
                expect(res.body.email).to.equal(firstUserBody.email);
                expect(res.body.id).to.equal(firstUserIdTest);
            });

            it('should allow a DELETE from /users/:userId', async function () {
                const res = await request
                    .delete(`/users/${firstUserIdTest}`)
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send();
                expect(res.status).to.equal(204);
            });
        });

    });


});


