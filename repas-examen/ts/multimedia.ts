import { BarraMultimedia } from './lib/gestionarMultimedia.js';

// Crear un contenedor para el ejemplo
const contenedor = document.createElement('div');
contenedor.id = 'contenedor-video';
document.body.appendChild(contenedor);

// Crear el elemento de vídeo (usando un video de muestra de YouTube embebido como archivo mp4)
const video = document.createElement('video');
video.id = 'video-exemple';
video.width = 480;
video.height = 270;
video.controls = true;
video.src = 'https://www.w3schools.com/html/mov_bbb.mp4'; // Video de ejemplo libre
contenedor.appendChild(video);

// Crear la barra de controles personalizada
const barra = new BarraMultimedia(video, contenedor);

// Ejemplo de AUDIO
const contenedorAudio = document.createElement('div');
contenedorAudio.id = 'contenedor-audio';
document.body.appendChild(contenedorAudio);

const audio = document.createElement('audio');
audio.id = 'audio-exemple';
audio.controls = true;
audio.src = 'https://www.w3schools.com/html/horse.mp3'; // Audio de ejemplo libre
contenedorAudio.appendChild(audio);

const barraAudio = new BarraMultimedia(audio, contenedorAudio);
