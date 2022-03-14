// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "be1c95b9-cbc7-48c6-8e6a-89837aa9113e";

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

/* A variable that changes the fade out speed of the option text on
 * a mobile. */
undum.game.mobileHide = 2000

/* A variable that changes the options fade out speed. */
undum.game.fadeSpeed = 1500

/* A variable that changes the slide up speed after clicking on an
 * option. */
undum.game.slideUpSpeed = 500

/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    start: new undum.SimpleSituation(
        "<h1>La historia comienza...</h1>\
        <img src='media/games/juego/logoUniversidad.png' class='float_right imagenLogo'>\
        <p>Para poner en situación a nuestros jugadores: es un jueves en la universidad de jaén, son las 8:30 de la tarde y salimos de clase,\
         estas agotado y mañana tienes un examen; a la lejania se escucha ruidos de jaleo de personas pero no le prestas mucha atención y vuelves a tu piso donde te\
          esta esperando tu compañero Jorge.</p>\
        <p>Cuando llegas al piso, Jorge con muchas energías y con musica épica de Thegrefg te dice: <br>\
        '¿¡Te has enterado de quien ha venido a Jaén para dar un concierto de sorpresa!?, Alan Walker tio el mismisimo Alan Walker. Tenemos que ir!!!,\
         estas sorpresa es subrealista es como si estuvieramos escribiendo una historia para nosotros en la asignatura desarrollo de Ágil jajaja.'</p>\
        \
        <p class='transient'><a href='hub1'>Click para continuar...</a></p>"
    ),
    situations1: new undum.Situation({
        enter: function(character, system, from) {
            system.setQuality("alegria", character.qualities.alegria+1);
            system.write($("#EleccionConcierto").html());
        },
        tags: ["topic1"],
        optionText: "Tenemos que ir ya, corre vamos al concierto...",
        displayOrder: 1
    }),
    situations2: new undum.Situation({
        enter: function(character, system, from) {
            system.setQuality("alegria", character.qualities.alegria-1);
            system.write($("#EleccionPiso").html());
        },
        tags: ["topic1"],
        optionText: "Ve tu si quieres, yo me quedo en el piso a estudiar...",
        displayOrder: 2
    }),
    resultadopiso: new undum.SimpleSituation(
        "<br>\
        <img src='media/games/juego/numero5.jpg' class='float_right imagenLogo'>\
        <p>Como has estudiado en el piso y al estar solo en el piso has estudiado pero\
         te has entretenido mucho con videos que te mandaban tus amigos del concierto,\
          por lo tanto no estudias lo suficiente y sacas en la nota del examen un 5.</p>",
        {
            enter: function(character, system, from) {
                system.setQuality("alegria", character.qualities.alegria-1);
            }
        }
    ),
    situations3: new undum.Situation({
        enter: function(character, system, from) {
            system.write($("#EleccionBiblioteca").html());
        },
        tags: ["topic1"],
        optionText: "No puedo, me voy a ir a la biblioteca a estudiar...",
        displayOrder: 3
    }),
    resultadobiblioteca: new undum.SimpleSituation(
        "<br>\
        <img src='media/games/juego/numero9.svg' class='float_left imagenLogo'>\
        <p>Como has estudiado en la biblioteca y al estar con el movil en silencio,\
         nos has visto los videos que te han mandado tus amigos y has estado concentrado estudiando,\
          por lo que te aprendistes bien los temas del examen y sacas en la nota del examen un 9.</p>"
    ),
    situations11: new undum.Situation({
        enter: function(character, system, from) {
            if (character.qualities.vida>=8 && character.qualities.alegria<=10) {
                system.write($("#EleccionIrseBasica").html());
            } else if (character.qualities.vida>=3 && character.qualities.vida<8  && character.qualities.alegria<=10){
                system.write($("#EleccionIrseVomito").html());
            } else if (character.qualities.vida > 0 && character.qualities.vida < 3 && character.qualities.alegria>=8){
                system.write($("#EleccionNoIrse").html());
            } else if (character.qualities.vida==0) {
                system.write($("#EleccionIrseHospital").html());
            }
            
        },
        tags: ["topic2"],
        optionText: "Me tengo que ir ya...",
        displayOrder: 4
    }),
    situations12: new undum.Situation({
        enter: function(character, system, from) {
            if (character.qualities.vida>0) {
                system.setQuality("vida", character.qualities.vida-2);
                if (character.qualities.alegria!=10) {
                    system.setQuality("alegria", character.qualities.alegria+1);
                }
                system.write($("#EleccionBeber").html());
            } else {
                system.write($("#EleccionIrseHospital").html());
            }
            
            
        },
        tags: ["topic2"],
        optionText: "Beber...",
        displayOrder: 5
    }),
    situations13: new undum.Situation({
        enter: function(character, system, from) {
            if (character.qualities.vida!=0) {
                if (character.qualities.alegria!=10) {
                    system.setQuality("alegria", character.qualities.alegria+1);
                }
                system.write($("#EleccionBailar").html());
            } else {
                system.write($("#EleccionIrseHospital").html());
            }
            
        },
        tags: ["topic2"],
        optionText: "Bailar...",
        displayOrder: 6
    }),
    resultadohospital: new undum.SimpleSituation(
        "<br>\
        <img src='media/games/juego/numero0.svg' class='float_left imagenLogo'>\
        <p>Como has pasado la noche en el hospital, no has podido estudiar, pues ni te has presentado al examen, sabias que era una perdida de tiempo y\
        la pedazo de resaca que tienes tampoco es que quieras ir a ningun sitio, solo a tu piso a seguir durmiendo la mona con el cuarto a oscuras donde no entre\
        ni un rayo de sol, aunque algunos dicen que la resaca se quita bebiendo pero yo no me creo eso. <br>\
        Sabado de resaca sin hacer nada, no pasa nada el domingo quedas con Victor para desayunar churros y\
         chocolate (ya que presume que le salen muy buenos) y recordarlo como una anécdota.</p>"
    ),
    resultadobasico: new undum.SimpleSituation(
        "<br>\
        <img src='media/games/juego/numero-4.jpg' class='float_left imagenLogo'>\
        <p>Te vas del conciento a tu piso y te pones a estudiar lo que puedes, al final te sonaba algo de atender a clase\
        y algo se pudo rascar pero no lo suficiente al final salistes con un 4 es suspenso, asi que para la proxima vez se\
        lo plateara.</p>"
    ),
    resultadovomito: new undum.SimpleSituation(
        "<br>\
        <img src='media/games/juego/numero0.svg' class='float_left imagenLogo'>\
        <p>Al final te quedastes dormido y no te levantas para ir al examen, tampoco serviria de nadaya que no estudiastes nada\
         , al final te quedas con un rescuerdo de un concierto increible pero la amargura del examen</p>"
    ),
    
    


};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "start";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
    vida: new undum.IntegerQuality(
        "Vida", {priority:"0001", group:'stats'}
    ),
    alegria: new undum.NumericQuality(
        "Alegria", {priority:"0002", group:'stats'}
    ),
    /* luck: new undum.FudgeAdjectivesQuality( // Fudge as in the FUDGE RPG
        "<span title='Skill, Stamina and Luck are reverently borrowed from the Fighting Fantasy series of gamebooks. The words representing Luck are from the FUDGE RPG. This tooltip is illustrating that you can use any HTML in the label for a quality (in this case a span containing a title attribute).'>Luck</span>",
        {priority:"0003", group:'stats'}
    ),

    inspiration: new undum.NonZeroIntegerQuality(
        "Inspiration", {priority:"0001", group:'progress'}
    ),
    novice: new undum.OnOffQuality(
        "Novice", {priority:"0002", group:'progress', onDisplay:"&#10003;"}
    ) */
};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
    stats: new undum.QualityGroup(null, {priority:"0001"}),
    progress: new undum.QualityGroup('Progress', {priority:"0002"})
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
    character.qualities.vida = 10;
    character.qualities.alegria = 4;
    //character.qualities.luck = 0;
    //character.qualities.novice = 1;
    //character.qualities.inspiration = 0;
    //system.setCharacterText("<p>You are starting on an exciting journey.</p>");
};
