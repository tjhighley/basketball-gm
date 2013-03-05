/**
 * @name util.helpers
 * @namespace Various utility functions that don't have anywhere else to go.
 */
define(["globals"], function (g) {
    "use strict";

    /*Validate that the given abbreviation corresponds to a valid team.

    If an invalid abbreviation is passed, the user's team will be used.

    Args:
        abbrev: Three-letter all-caps string containing a team's
            abbreviation.
    Returns:
        A two element list of the validated team ID and abbreviation.
    */
    function validateAbbrev(abbrev) {
        var abbrevs, tid;

        abbrevs = ["ATL", "BOS", "BK", "CHA", "CHI", "CLE", "DAL", "DEN", "DET", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOR", "NYK", "OKC", "ORL", "PHI", "PHO", "POR", "SAC", "SAS", "TOR", "UTA", "WAS"];
        tid = abbrevs.indexOf(abbrev);

        if (tid < 0) {
            tid = g.userTid;
            abbrev = abbrevs[tid];
        }

        return [tid, abbrev];
    }

    /* Same as validateAbbrev, but for tid. */
    function validateTid(tid) {
        var abbrev, abbrevs;

        abbrevs = ["ATL", "BOS", "BK", "CHA", "CHI", "CLE", "DAL", "DEN", "DET", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOR", "NYK", "OKC", "ORL", "PHI", "PHO", "POR", "SAC", "SAS", "TOR", "UTA", "WAS"];
        tid = parseInt(tid, 10);

        if (tid < 0 || tid >= abbrevs.length) {
            tid = g.userTid;
        }
        abbrev = abbrevs[tid];

        return [tid, abbrev];
    }

    /* Same as validateTid, but returns only the abbrev. */
    function getAbbrev(tid) {
        var abbrev, result;

        result = validateTid(tid);
        tid = result[0];
        abbrev = result[1];

        return abbrev;
    }

    /*Validate that the given season is valid.

    A valid season is the current season or one of the past seasons. If an
    invalid season is passed, the current will be used.

    Args:
        season: An integer containing the year of the season.
    Returns:
        An integer containing the argument, if valid, or the year of the current
        season.
    */
    function validateSeason(season) {
        if (!season) {
            season = g.season;
        } else {
            // Make sure there is an entry for the supplied season in the DB somewhere
            season = parseInt(season, 10);
        }

        return season;
    }

    /*Returns a list of all the seasons, past and present.*/
    function getSeasons(selectedSeason, ignoredSeason) {
        var season, seasons;

        selectedSeason = parseInt(selectedSeason, 10);
        ignoredSeason = ignoredSeason !== undefined ? parseInt(ignoredSeason, 10) : null;

        seasons = [];
        for (season = g.startingSeason; season <= g.season; season++) {
            if (season !== ignoredSeason) {
                seasons.push({season: season, selected: selectedSeason === season});
            }
        }
        return seasons;
    }

    /*Returns a list of all the teams. If selectedTid is passed, then the "selected" property will be added to each team, true only for selectedTid and false otherwise. If cb is passed, it is run with the teams array as an argument. Otherwise, the teams array is returned.*/
    function getTeams(selectedTid, cb) {
        var i, teams;

        selectedTid = selectedTid !== undefined ? parseInt(selectedTid, 10) : -1;
        teams = [
            {tid: 0, cid: 0, did: 2, region: "Atlanta", name: "Herons", abbrev: "ATL"},
            {tid: 1, cid: 0, did: 0, region: "Boston", name: "Clovers", abbrev: "BOS"},
            {tid: 2, cid: 0, did: 0, region: "Brooklyn", name: "Nests", abbrev: "BK"},
            {tid: 3, cid: 0, did: 2, region: "Charlotte", name: "Bay Cats", abbrev: "CHA"},
            {tid: 4, cid: 0, did: 1, region: "Chicago", name: "Bullies", abbrev: "CHI"},
            {tid: 5, cid: 0, did: 1, region: "Cleveland", name: "Cobras", abbrev: "CLE"},
            {tid: 6, cid: 1, did: 3, region: "Dallas", name: "Mares", abbrev: "DAL"},
            {tid: 7, cid: 1, did: 4, region: "Denver", name: "Ninjas", abbrev: "DEN"},
            {tid: 8, cid: 0, did: 1, region: "Detroit", name: "Pumps", abbrev: "DET"},
            {tid: 9, cid: 1, did: 5, region: "Golden State", name: "War Machine", abbrev: "GSW"},
            {tid: 10, cid: 1, did: 3, region: "Houston", name: "Rock Throwers", abbrev: "HOU"},
            {tid: 11, cid: 0, did: 1, region: "Indiana", name: "Passers", abbrev: "IND"},
            {tid: 12, cid: 1, did: 5, region: "Los Angeles", name: "Cutters", abbrev: "LAC"},
            {tid: 13, cid: 1, did: 5, region: "Los Angeles", name: "Lagoons", abbrev: "LAL"},
            {tid: 14, cid: 1, did: 3, region: "Memphis", name: "Growls", abbrev: "MEM"},
            {tid: 15, cid: 0, did: 2, region: "Miami", name: "Heatwave", abbrev: "MIA"},
            {tid: 16, cid: 0, did: 1, region: "Milwaukee", name: "Buccaneers", abbrev: "MIL"},
            {tid: 17, cid: 1, did: 4, region: "Minnesota", name: "Trees", abbrev: "MIN"},
            {tid: 18, cid: 1, did: 3, region: "New Orleans", name: "Honey Bees", abbrev: "NOR"},
            {tid: 19, cid: 0, did: 0, region: "New York", name: "Knights", abbrev: "NYK"},
            {tid: 20, cid: 1, did: 4, region: "Oklahoma City", name: "Tornados", abbrev: "OKC"},
            {tid: 21, cid: 0, did: 2, region: "Orlando", name: "Mystery", abbrev: "ORL"},
            {tid: 22, cid: 0, did: 0, region: "Philadelphia", name: "Steaks", abbrev: "PHI"},
            {tid: 23, cid: 1, did: 5, region: "Phoenix", name: "Stars", abbrev: "PHO"},
            {tid: 24, cid: 1, did: 4, region: "Portland", name: "Trailer Park", abbrev: "POR"},
            {tid: 25, cid: 1, did: 5, region: "Sacramento", name: "Killers", abbrev: "SAC"},
            {tid: 26, cid: 1, did: 3, region: "San Antonio", name: "Spurts", abbrev: "SAS"},
            {tid: 27, cid: 0, did: 0, region: "Toronto", name: "Ravens", abbrev: "TOR"},
            {tid: 28, cid: 1, did: 4, region: "Utah", name: "Jugglers", abbrev: "UTA"},
            {tid: 29, cid: 0, did: 2, region: "Washington", name: "Witches", abbrev: "WAS"}
        ];

        if (selectedTid >= 0) {
            for (i = 0; i < teams.length; i++) {
                teams[i].selected = false;
            }
            teams[selectedTid].selected = true;
        }

        if (cb !== undefined) {
            cb(teams);
        } else {
            return teams;
        }
    }

    /**
     * Clones an object.
     * 
     * Taken from http://stackoverflow.com/a/3284324/786644
     *
     * @memberOf util.helpers
     * @param {Object} obj Object to be cloned.
     */
    function deepCopy(obj) {
        var key, retVal;

        if (typeof obj !== "object") { return obj; }
        if (obj.constructor === RegExp) { return obj; }

        retVal = new obj.constructor();
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                retVal[key] = deepCopy(obj[key]);
            }
        }
        return retVal;
    }

    /**
     * Display a whole-page error message to the user by calling either views.leagueError or views.globalError as appropriate.
     * 
     * @memberOf util.helpers
     * @param {string} error Text of the error message to be displayed.
     * @param {Object} req Optional Davis.js request object, containing the callback function and any other metadata
     */
    function error(errorText, req) {
        var lid, views;

        views = require("views");

        if (req !== undefined) {
            req.params.error = errorText;
        } else {
            req = {params: {error: errorText}, raw: {}};
        }

        lid = location.pathname.split("/")[2]; // lid derived from URL
        if (/^\d+$/.test(lid)) {
            req.params.lid = parseInt(lid, 10);
            views.leagueError(req);
        } else {
            views.globalError(req);
        }
    }

    /**
     * Delete all the things from the global variable g that are not stored in league databases.
     *
     * This is used to clear out values from other leagues, to ensure that the appropriate values are updated in the database when calling db.setGameAttributes.
     * 
     * @memberOf util.helpers
     */
    function resetG() {
        var key;

        for (key in g) {
            if (g.hasOwnProperty(key) && g.notInDb.indexOf(key) < 0) {
                delete g[key];
            }
        }
    }

    /**
     * Ping a counter at basketball-gm.com.
     *
     * @memberOf util.helpers
     * @param {string} type Either "league" for a new league, or "season" for a completed season
     */
    function bbgmPing(type) {
        var img;

        img = document.createElement("img");
        img.src = "http://www.basketball-gm.com/counter.php?type=" + type + "&season=" + g.season;
    }


    function skillsBlock(skills) {
        var i, skillsHtml, tooltips;

        tooltips = {
            "3": "Three Point Shooter",
            A: "Athlete",
            B: "Ball Handler",
            Di: "Interior Defender",
            Dp: "Perimeter Defender",
            Po: "Post Scorer",
            Ps: "Passer",
            R: "Rebounder"
        };

        skillsHtml = '';
        if (skills !== undefined) {
            for (i = 0; i < skills.length; i++) {
                skillsHtml += '<span class="skill" title="' + tooltips[skills[i]] + '">' + skills[i] + '</span>';
            }
        }

        return skillsHtml;
    }

    function round(value, precision) {
        precision = precision !== undefined ? parseInt(precision, 10) : 0;

        return parseFloat(value).toFixed(precision);
    }

    return {
        validateAbbrev: validateAbbrev,
        getAbbrev: getAbbrev,
        validateTid: validateTid,
        validateSeason: validateSeason,
        getSeasons: getSeasons,
        getTeams: getTeams,
        deepCopy: deepCopy,
        error: error,
        resetG: resetG,
        bbgmPing: bbgmPing,
        skillsBlock: skillsBlock,
        round: round
    };
});
