// Internationalization module
// Currently supports: es-ar (Spanish Argentine)

const i18n = {
    currentLocale: 'es-ar',
    
    translations: {
        'es-ar': {
            // Meta
            'meta.title': 'Torneo de Ciudades Europeas',
            'meta.title.demo': 'Desafío de Ciudades Europeas - Demo',
            
            // Start Screen
            'start.title': '🗺️ Torneo Viajero por Europa',
            'start.subtitle': '¡Competí eligiendo ciudades para tu aventura europea!',
            'start.demo.subtitle': 'Modo Demo - ¡Elegí ciudades para tu aventura europea!',
            'start.demo.note': 'Demo de un jugador (sin sincronización)',
            'start.input.name': 'Ingresá tu nombre',
            'start.btn.create': 'Crear Nueva Partida',
            'start.btn.join': 'Unirse a Partida',
            'start.btn.demo': 'Iniciar Demo',
            'start.divider': 'O',
            'start.input.code': 'Ingresá el código de partida',
            
            // Waiting Room
            'waiting.title': 'Sala de Espera',
            'waiting.code': 'Código de Partida:',
            'waiting.share': 'Compartí este código con tu compañero',
            'waiting.btn.start': 'Continuar a Selección de Ciudades',
            'waiting.btn.leave': 'Salir',
            
            // City Selection Screen
            'selection.title': 'Seleccioná Ciudades para el Torneo',
            'selection.info': 'Elegí 16 ciudades para competir (Milán y Roma están pre-seleccionadas)',
            'selection.custom.title': '➕ Agregar Ciudad Personalizada',
            'selection.custom.name': 'Nombre de la ciudad',
            'selection.custom.country': 'País',
            'selection.custom.emoji': 'Emoji',
            'selection.custom.image': 'URL de imagen (opcional)',
            'selection.custom.description': 'Descripción',
            'selection.custom.btn': 'Agregar Ciudad',
            'selection.count': '{0} / 16 ciudades seleccionadas',
            'selection.btn.start': 'Iniciar Torneo',
            
            // Tournament Bracket
            'bracket.title': 'Cuadro del Torneo',
            'bracket.btn.start': 'Iniciar Próxima Ronda',
            'bracket.vs': 'vs',
            'bracket.winner': 'Ganador: {0}',
            'bracket.round.round-of-16': 'Octavos de Final',
            'bracket.round.quarterfinals': 'Cuartos de Final',
            'bracket.round.semifinals': 'Semifinales',
            'bracket.round.final': 'Final',
            
            // Writing Phase
            'writing.timer': '{0}:{1}',
            'writing.title': 'Escribí sobre las Ciudades',
            'writing.info': 'Tenés 1 minuto para escribir pros y contras de cada ciudad',
            'writing.label.pros': 'Puntos Fuertes:',
            'writing.label.cons': 'Contras:',
            'writing.placeholder.pros': '¿Qué te gusta de esta ciudad?',
            'writing.placeholder.cons': '¿Qué te preocupa?',
            'writing.vs': 'VS',
            'writing.alt.image': 'Monumento de la ciudad',
            
            // Debate Phase
            'debate.title': '¡Hora del Debate!',
            'debate.info': 'Discutí con tu compañero (5 minutos)',
            'debate.info.extended': '1 minuto de debate extendido',
            'debate.pros': '👍 Pros:',
            'debate.cons': '👎 Contras:',
            'debate.btn.vote': 'Elegir Esta Ciudad',
            'debate.voted': 'Votaste por {0}. Esperando a tu compañero...',
            'debate.no.input': 'Sin comentarios',
            
            // Results Screen
            'results.title': '🎉 ¡Tu Itinerario Europeo!',
            'results.dates': '5 de Marzo - 26 de Marzo',
            'results.total': 'Total de ciudades elegidas: {0}',
            'results.mutual': 'Coincidencias: {0}',
            'results.btn.again': 'Planear Otro Viaje',
            
            // Game Screen
            'game.header.player': 'Jugador: {0}',
            'game.header.cards': 'Cartas: {0}/{1}',
            'game.btn.reject': '✗ Saltar',
            'game.btn.accept': '✓ Elegir',
            'game.indicator.left': '✗',
            'game.indicator.right': '✓',
            
            // Status Messages
            'status.waiting': 'Esperando a tu compañero...',
            'status.match': '🎉 ¡Ambos eligieron esta ciudad!',
            'status.nomatch': 'Diferentes elecciones',
            
            // Alert Messages
            'alert.name.required': 'Por favor, ingresá tu nombre',
            'alert.code.required': 'Por favor, ingresá un código de partida',
            'alert.firebase.error': 'Firebase no configurado. Por favor, verificá config.js',
            'alert.create.error': 'Error al crear la partida. Por favor, intentá de nuevo.',
            'alert.join.error': 'Error al unirse a la partida. Por favor, intentá de nuevo.',
            'alert.game.notfound': 'Partida no encontrada. Por favor, verificá el código.',
            'alert.game.started': 'Esta partida ya comenzó.',
            'alert.custom.required': 'Por favor, ingresá al menos el nombre de la ciudad y el país',
            'alert.custom.added': '¡Se agregó {0}!',
            
            // City Descriptions (keep original cities, just translate labels)
            'city.date.format': '{0}',
            'city.image.alt': 'Monumento de la ciudad',
            
            // Trophies
            'trophy.gold': '🥇',
            'trophy.silver': '🥈',
            'trophy.bronze': '🥉'
        }
    },
    
    // Get translated text
    t(key, ...args) {
        const translation = this.translations[this.currentLocale][key] || key;
        
        // Replace placeholders {0}, {1}, etc.
        if (args.length > 0) {
            return translation.replace(/\{(\d+)\}/g, (match, index) => {
                return args[parseInt(index)] !== undefined ? args[parseInt(index)] : match;
            });
        }
        
        return translation;
    },
    
    // Set text content of element
    setText(elementId, key, ...args) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = this.t(key, ...args);
        }
    },
    
    // Set placeholder of input element
    setPlaceholder(elementId, key, ...args) {
        const element = document.getElementById(elementId);
        if (element) {
            element.placeholder = this.t(key, ...args);
        }
    },
    
    // Set HTML content (use carefully)
    setHTML(elementId, key, ...args) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = this.t(key, ...args);
        }
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
}
