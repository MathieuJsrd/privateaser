'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(bars);
console.log(events);
console.log(actors);

//STEP 1
//The event final price is: time + people
//Time = event.time * bar.pricePerHour
//People = event.nbpeople * bar.priceperperson

//Every bar doesn't have a booking with every event, so we need to control that

//STEP 2
//If <10 persons => discount of 10%
//If <20 persons => discount of 30%
//If <60 persons => discount of 50%

//STEP 3
//We have to pay the bar : 70% of the booking price
//30% of the booking price returns to a commission pot
//50% of the commission returns to insurance
//1€ per person to the treasury
//the rest to privateaser

//STEP 4
//
for(var i = 0; i < events.length; i++)
{
  for(var j = 0; j < bars.length; j++)
  {
    //If the bar and the event has a booking in common, we come into
    if(events[i].barId == bars[j].id)
    {
      //Here, we need to calculate the event cost with the above formula
      var price_event = events[i].time * bars[j].pricePerHour + events[i].persons * bars[j].pricePerPerson;
      //Step 2
      if(events[i].persons >= 10)
      {
        price_event = price_event - 0.1 * price_event;
      }
      if(events[i].persons >= 20)
      {
        price_event = price_event - 0.3 * price_event;
      }
      if(events[i].persons >= 60)
      {
        price_event = price_event - 0.5 * price_event;
      }
	  //Step4
	  //If deductible option == true
	  //
	  if (events[i].options.deductibleReduction == true)
      {
		price_event = price_event + events[i].persons;
      }
	  events[i].price = price_event;
      console.log("Price : "+ price_event + " for :");
      console.log(events[i]);

	  //Step 3
	  var commission_pot = 0.3 * price_event;
	  events[i].commission.insurance = 0.5 * commission_pot;
	  events[i].commission.treasury = events[i].persons;
	  events[i].commission.privateaser = (0.5 * commission_pot) - events[i].persons;
	  console.log("Insurance : " + events[i].commission.insurance);
	  console.log("Treasury : " + events[i].commission.treasury);
	  console.log("Privateaser : " + events[i].commission.privateaser);
    }
  }
}
//Step5
actors.forEach(actor => {
events.forEach(event =>{
  if(actor.eventId == event.id)
  {
    actor.payment[0].amount = event.price;
    actor.payment[1].amount = event.price - (event.price * 0.3);
    actor.payment[2].amount = event.commission.insurance;
    actor.payment[3].amount = event.persons;
    actor.payment[4].amount = event.commission.privateaser;
  }
})
})

console.log(events);
console.log(actors);



