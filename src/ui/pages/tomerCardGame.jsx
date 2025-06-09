// export default function ActiveRoom() {

//   const room = useSelector(store=> store.room);
//   console.log(room)

//   //it will change Gil!!!!!!!!!!!!!!!!!!!!
//   const wordPairs = [
//     { en: "apple", he: "תפוח" },
//     { en: "dog", he: "כלב" },
//     { en: "house", he: "בית" },
//     { en: "sun", he: "שמש" },
//     { en: "book", he: "ספר" },
//     { en: "car", he: "מכונית" },
//     { en: "tree", he: "עץ" },
//     { en: "water", he: "מים" },
//     { en: "music", he: "מוזיקה" },
//     { en: "school", he: "בית ספר" },
//   ];

//   const [cards, setCards] = useState(() =>
//     wordPairs.flatMap((pair, index) => [
//       {
//         id: `en-${index}`,
//         word: pair.en,
//         matchId: index,
//         isRevealed: false,
//       },
//       {
//         id: `he-${index}`,
//         word: pair.he,
//         matchId: index,
//         isRevealed: false,
//       },
//     ])
//   );

//   return (
//     <div className="min-h-screen bg-[url('/homePage.png')] flex items-center justify-center">
//       <div className="flex flex-wrap w-[640px] gap-4 justify-center">
//         {cards.map((card) => (
//           <WordCard
//             key={card.id}
//             word={card.word}
//             isRevealed={card.isRevealed}
//             onClick={() => console.log("clicked:", card.word)}
//           />
//         ))}
//       </div>
//     </div>

//   );
// }
