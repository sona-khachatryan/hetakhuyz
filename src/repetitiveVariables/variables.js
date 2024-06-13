export const address = "https://hetakhuyz.am/service"



export const dates = {
    '01': 'Հնվ',
    '02': 'Փտր',
    '03': 'Մրտ',
    '04': 'Ապր',
    '05': 'Մայ',
    '06': 'Հուն',
    '07': 'Հուլ',
    '08': 'Օգս',
    '09': 'Սպտ',
    '10': 'Հոկ',
    '11': 'Նոյ',
    '12': 'Դեկ',
}

export const countries = {
  "armenia":"Հայաստան",
  "1":"Հայաստան",
  "turkey":"Թուրքիա",
  "2":"Թուրքիա",
  "georgia":"Վրաստան",
  "3":"Վրաստան",
  "iran":"Իրան",
  "4":"Իրան",
  "azerbaijan":"Ադրբեջան",
  "5":"Ադրբեջան",
  "international":"Միջազգային",
  "6":"Միջազգային",
  "region":"Տարածաշրջան"
}

export const countriesfilter = {
  "armenia":1,
  "turkey":2,
  "georgia":3,
  "iran":4,
  "azerbaijan":5,
  "international":6,
  1:"armenia",
  2:"turkey",
  3:"georgia",
  4:"iran",
  5:"azerbaijan",
  6:"international"


}

export const categories = {
  "1":"Քաղաքական",
  "2":"Իրավական",
  "3":"Ռազմական",
  "4":"Հասարակություն",
  "politics":1,
  "legal":2,
  "military":3,
  "society":4

}

export const categoriesfilter = {
  1:"politics",
  2:"legal",
  3:"military",
  4:"society",
  "politics":"Քաղաքական",
  "legal":"Իրավական",
  "military":"Ռազմական",
  "society":"Հասարակություն",
}

export const contentTypefilter = {
  "text":"Թեքստային",
  "video":"Վիդեո",
  "live":"Ուղիղ եթեր"
}

export function handleDate(createdAt){
    if(!createdAt)return
    const date = createdAt.split("-")
    return `${dates[date[1]]} ${date[2].slice(0,2)},${date[0]}`
  }

export function scrollTop(){
    window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
}