/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('it has a URL', function(){
            for(i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('it has a name', function(){
            for(i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('the menu element is hidding', function() {
           expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('it does changes its visibility', function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* Test suite: "Initial Entries" */
    describe('Initial Entries', function(){

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

         // Call to the asynchronous function
        beforeEach(function(done){
            loadFeed(0, function() {
                done();
            });
        });

         it('its done loading and has an entry', function(done){
            expect($('.entry').length).toBeGreaterThan(0);
            done();
         });

    });

    /* Test suite: "New Feed Selection" */

    describe('New Feed Selection', function() {

        // Holds the previous entries of the RSS
        var lastFeed;

        // Call to the asynchronous function
        beforeEach(function(done) {
            lastFeed = $('.entry').html();

            loadFeed(1, function() {
                done();
            });
        });

        // Compare the feeds
        it('it does change', function(done){
            expect(lastFeed).not.toMatch($('.entry').html());
            done();
        });
    });
//

}());
