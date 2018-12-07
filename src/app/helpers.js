/**
 * File app/helpers.js
 *
 * Ce fichier contient les outils utiles
 * au bon fonctionnement de l'app
 *
 * @author sofianeakbly
 **/


import date from 'moment-timezone'

let helpers = {}

helpers.times = [{ id: 1, phonetic: "fajr", arab: "الفجر", adjustment: -5, wait: 10 },
  { id: 2, phonetic: "shuruq", arab: "الشروق", adjustment: 0, wait: 0 },
  { id: 3, phonetic: "dhuhr", arab: "الظهر", adjustment: 5, wait: 10 },
  { id: 4, phonetic: "asr", arab: "العصر", adjustment: 0, wait: 10 },
  { id: 5, phonetic: "maghrib", arab: "المغرب", adjustment: 5, wait: 5 },
  { id: 6, phonetic: "isha", arab: "العشاء", adjustment: 0 }]

helpers.setTimes = (times) => {
  helpers.times = times
}

helpers.twoDigits = (n) => {
  return n < 10 ? '0' + n : n
}

helpers.translate = (phonetic) => {
  for (let i = 0; i < helpers.times.length; i++) {
    let time = helpers.times[i]
    if (time.phonetic === phonetic)
      return time.arab
  }
  return ''
}

helpers.online = () => {
  return navigator.onLine
}

helpers.moment = (d = null) => {
  date.locale('fr')
  date.tz.setDefault('Europe/Paris')
  return d === null ? date.tz(moment(), 'Europe/Paris') : date.tz(d, 'Europe/Paris')
}

helpers.getNextTime = (prayers, t = true) => {
  let now = helpers.moment();
  let next = helpers.moment();
  let last = helpers.moment();
  let n

  Object.keys(prayers).forEach((name) => {
    let prayer = prayers[name]
    // console.log(helpers.moment(prayer.date))
    if (next.unix() > last.unix() && now.unix() < helpers.moment(prayer.date).unix()) {
      n = name
      next = helpers.moment(prayer.date)
    }
    last = helpers.moment(prayer.date)
  })


  if (next.unix() === now.unix()) {
    n = 'fajr';
    next = helpers.moment(prayers.fajr.date)
    next.add(1, 'day')
  }
  // next = helpers.moment(prayers.fajr.date)
  // next.add(1, 'day')
  // return t ? next : 'fajr';
  // return t ? helpers.moment(prayers.fajr.date) : 'fajr';
  return t ? helpers.moment(next) : n;

  // foreach ($prayers as $name => $prayer) {
  //   if ($next->prayerstamp > $last->prayerstamp && $now->prayerstamp < Carbon::parse($prayer->date ?? $prayer->toDateTimeString() ?? '', 'Europe/Paris')->prayerstamp) {
  //     $n = $name;
  //     $next = Carbon::parse($prayer->date ?? $prayer->toDateTimeString() ?? '', 'Europe/Paris');
  //   }
  //   $last = Carbon::parse($prayer->date ?? $prayer->toDateTimeString() ?? '', 'Europe/Paris');
  // }
  // if ($next->prayerstamp === $now->prayerstamp) {
  //   $n = 'fajr';
  //   $next = Carbon::parse($prayers->fajr->date ?? Carbon::now()->toDateTimeString(), 'Europe/Paris');
  // }
  // return $t ? Carbon::parse($next, 'Europe/Paris') : $n;
//        return $t ? Carbon::createFromTime($now->diff($next)->h, $now->diff($next)->i, $now->diff($next)->s) : $n;

}

helpers.getWeatherIcon = (icon) => {
  let current = 'clouds', icons = {
    '01': 'sun',
    '02': 'cloudy',
    '03': 'clouds',
    '09': 'rain-cloud',
    '10': 'raining',
    '11': 'thunder',
    '13': 'snow',
    '14': 'mist'
  }

  Object.keys(icons).map(function (key) {
    if (icon.indexOf(key) !== -1) {
      current = icons[key]
      return current
    }
  })
  return current || 'clouds'
}

export default helpers

