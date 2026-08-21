const Event = require("../models/event");

// GET /events — list all festivals/events
module.exports.index = async (req, res) => {
  const { month, district } = req.query;
  const filter = {};
  if (month) filter.month = month;
  if (district) filter.district = district;

  const [events, months, districts] = await Promise.all([
    Event.find(filter).populate("place").sort({ name: 1 }),
    Event.distinct("month"),
    Event.distinct("district"),
  ]);

  res.render("events/index", { events, months: months.sort(), districts: districts.sort(), query: req.query });
};

// GET /events/:id — single event detail
module.exports.show = async (req, res) => {
  const event = await Event.findById(req.params.id).populate("place");
  res.render("events/show", { event });
};
