"use strict";

/* Get or create the application global variable */
var App = App || {};

/* IIFE to initialize the main entry of the application*/
(function() {

    // setup the pointer to the scope 'this' variable
    var self = this;
    //var particleSystem;
    /* Entry point of the application */
    App.start = function()
    {
        // create a new scene
        App.scene = new Scene({container:"scene"});

        // initialize the particle system
        App.particleSystem = new ParticleSystem();
        App.particleSystem.initialize('data/058.csv');

        //add the particle system to the scene
        App.scene.addObject( App.particleSystem.getParticleSystems());

        // render the scene
        App.scene.render();

    };

    App.sliders = function()
    {
        App.particleSystem.enable_disable_sliders();
    }

    App.radio = function()
    {
        /*console.log("here!");
        if(document.getElementById("vertical").checked)
        {
            console.log("Vertical");
        }*/
        App.particleSystem.enable_disable_sliders();
    }
}) ();