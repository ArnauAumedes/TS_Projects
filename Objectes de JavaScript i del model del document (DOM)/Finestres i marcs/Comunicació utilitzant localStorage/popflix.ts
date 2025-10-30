// Crear un Map per les popflix 
export const POPFLIX = new Map<string, { name: string; isMovie: boolean; principalGenre: string, genres: string[] }>();
 
// Afegir les pelis a popflix
POPFLIX.set("The Shining", { name: "The Shining", isMovie: true, principalGenre: "Horror", genres: ["Psychological", "Thriller"] });
POPFLIX.set("Stranger Things", { name: "Stranger Things", isMovie: false, principalGenre: "Fantasy", genres: ["Horror", "Mystery"] });
POPFLIX.set("Breaking Bad", { name: "Breaking Bad", isMovie: false, principalGenre: "Crime", genres: ["Drama", "Thriller"] });
POPFLIX.set("Inception", { name: "Inception", isMovie: true, principalGenre: "Sci-Fi", genres: ["Thriller", "Action"] });
POPFLIX.set("The Crown", { name: "The Crown", isMovie: false, principalGenre: "Historical", genres: ["Drama"] });
POPFLIX.set("Get Out", { name: "Get Out", isMovie: true, principalGenre: "Horror", genres: ["Satire", "Mystery"] });
POPFLIX.set("Sherlock", { name: "Sherlock", isMovie: false, principalGenre: "Crime", genres: ["Mystery", "Drama"] });
POPFLIX.set("Blade Runner 2049", { name: "Blade Runner 2049", isMovie: true, principalGenre: "Sci-Fi", genres: ["Neo-noir", "Drama"] });
POPFLIX.set("Black Mirror", { name: "Black Mirror", isMovie: false, principalGenre: "Sci-Fi", genres: ["Dystopia", "Thriller"] });
POPFLIX.set("Pan's Labyrinth", { name: "Pan's Labyrinth", isMovie: true, principalGenre: "Fantasy", genres: ["Dark fantasy", "Drama"] });
POPFLIX.set("Narcos", { name: "Narcos", isMovie: false, principalGenre: "Crime", genres: ["Thriller", "Drama"] });
POPFLIX.set("The Godfather", { name: "The Godfather", isMovie: true, principalGenre: "Crime", genres: ["Drama"] });
POPFLIX.set("La Casa de Papel", { name: "La Casa de Papel", isMovie: false, principalGenre: "Crime", genres: ["Thriller", "Heist"] });
POPFLIX.set("Mad Max: Fury Road", { name: "Mad Max: Fury Road", isMovie: true, principalGenre: "Action", genres: ["Sci-Fi", "Adventure"] });
POPFLIX.set("The Witch", { name: "The Witch", isMovie: true, principalGenre: "Horror", genres: ["Fantasy", "Period"] });
POPFLIX.set("Fargo", { name: "Fargo", isMovie: false, principalGenre: "Crime", genres: ["Dark comedy", "Drama"] });
POPFLIX.set("Spirited Away", { name: "Spirited Away", isMovie: true, principalGenre: "Animation", genres: ["Fantasy", "Adventure"] });
POPFLIX.set("Mindhunter", { name: "Mindhunter", isMovie: false, principalGenre: "Crime", genres: ["Psychological", "Drama"] });
POPFLIX.set("Her", { name: "Her", isMovie: true, principalGenre: "Romance", genres: ["Sci-Fi", "Drama"] });
POPFLIX.set("The Mandalorian", { name: "The Mandalorian", isMovie: false, principalGenre: "Sci-Fi", genres: ["Adventure", "Western"] });

// Afegir pelis a cada usuari

// Crear un Map per als usuaris i les seves pelis preferides
const USERS = new Map<string, Set<string>>();

// Alice i Bob comparteixen 3 títols (The Shining, Get Out, Mad Max)
USERS.set('alice', new Set([
	'The Shining',
	'Get Out',
	'Mad Max: Fury Road',
	'Inception',
	"Pan's Labyrinth"
]));

USERS.set('bob', new Set([
	'The Shining',
	'Get Out',
	'Mad Max: Fury Road',
	'The Godfather',
	'La Casa de Papel'
]));

// Carol i Dave comparteixen 3 títols (Mindhunter, Narcos, Sherlock)
USERS.set('carol', new Set([
	'Mindhunter',
	'Narcos',
	'Sherlock',
	'Black Mirror',
	'Fargo'
]));

USERS.set('dave', new Set([
	'Mindhunter',
	'Narcos',
	'Sherlock',
	'Breaking Bad',
	'The Crown'
]));

// Eve comparteix 3 títols amb Alice (Inception, Spirited Away, The Shining)
USERS.set('eve', new Set([
	'Inception',
	'Spirited Away',
	'Her',
	'Blade Runner 2049',
	'The Shining'
]));

// Comprovar quins usuaris tenen més en comú
// LOGICA: Si tenes 3 o més pelis en comú, es considera que tenen preferències similars.
// Si el genere principal és el mateix, es considera que tenen preferències molt similars.
export function fSearchPreferences(users: Map<string, Set<string>>) {

}

