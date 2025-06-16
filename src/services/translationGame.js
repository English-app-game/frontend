import { TRANSLATION_GAME_EVENTS } from "../consts/translationGame";

export function emitMatchWord(emit, { roomKey, hebWordId, englishId, userId }) {
  emit(TRANSLATION_GAME_EVENTS.MATCH_WORD, {
    roomKey,
    hebrewId: hebWordId,
    englishId,
    userId,
  });
}



export function joinTranslationGameRoom(emit, { roomKey, user }) {
  emit(TRANSLATION_GAME_EVENTS.JOIN, { roomKey, user });
}
