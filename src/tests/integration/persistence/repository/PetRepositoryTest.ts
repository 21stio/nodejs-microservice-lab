import * as Chai from "chai";
import {DependencyResolver} from "../../../../app/DependencyResolver";
import * as Pet from "../../../../app/persistence/entity/Pet";

let tv4 = require("tv4");

let dependencyResolver= new DependencyResolver();
let configurationResolver= dependencyResolver.getConfigurationResolver();
let petRepository = dependencyResolver.getPersistenceResolver().getPetRepository();

describe("PetRepository", function () {

    describe("#getPetById()", function () {
        it("", function (done) {
            petRepository.createPet({name: "getPetById", tag: "getPetById"}).then(function (data) {
                petRepository.getPets().then(function (pets: [Pet.IPet]) {
                    petRepository.getPetById(pets[0]['id']).then(function (pet: Pet.IPet) {
                        Chai.assert.isTrue("name" in pet);
                        Chai.assert.isTrue("tags" in pet);

                        done();
                    })
                });
            });
        });
    });

    describe("#getPets()", function () {
        it("", function (done) {
            petRepository.getPets().then(function (pets: [Pet.IPet]) {
                let c = 0;

                for (let pet of pets) {
                    console.log(pet);
                    Chai.assert.isTrue("name" in pet);
                    Chai.assert.isTrue("tags" in pet);

                    if(pets.length == ++c) {
                        done();
                    }
                }
            });
        });
    });

    describe("#createPet()", function () {
        it("", function (done) {
            let petBody:Pet.IPetBody = {
                name: "createPet",
                tag: "createPet"
            };

            petRepository.createPet(petBody).then(function(result: boolean){
                Chai.assert.isTrue(result);

                done();
            });
        });
    });

    describe("#updatePet()", function () {
        it("", function (done) {
            let petBody:Pet.IPetBody = {
                name: "createPet",
                tag: "createPet"
            };

            petRepository.createPet(petBody).then(function(result: boolean){
                Chai.assert.isTrue(result);

                done();
            });
        });
    });

    describe("#deletePet()", function () {
        it("", function (done) {
            petRepository.deletePet(1).then(function(result: boolean){
                Chai.assert.isTrue(result);

                done();
            });
        });
    });

});