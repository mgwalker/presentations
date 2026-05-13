<!-- .slide: class="title" -->

# Introduction to APIs

how computers talk to each other

---
<!-- .slide: class="section" -->

# What is it?

API stands for "application programming interface." They
are how computers exchange information. APIs let systems
publish data they have, and can include controls for
formatting or filtering the data.

---
<!-- .slide: class="content four-dots" -->
APIs allow us to build systems that do one or two things
really well and then connect various systems together to
do more complex tasks. This has some benefits:

* ## Maintainability
  Because each piece does a relatively simple and isolated
  task, it's easier to maintain over time.

* ## Abstraction
  When you're using someone else data, you don't have to
  know about how it was collected or processed.

* ## Testable
  Smaller pieces doing simpler logic are easier to understand
  and test, leading to higher confidence that they work.

* ## Independence
  Letting external systems handle specific needs makes it
  easier to swap them out over time.

---
<!-- .slide: class="content" -->

# Getting water

![](images/sink-empty.png)<!-- .element: class="big" -->
<!-- .element: class="center" -->

Note: So imagine you're standing at this weird-looking
sink. You need to wash your hands.

---
<!-- .slide: class="content" -->

# Getting water

![](images/sink-hot.png)<!-- .element: class="big" -->
<!-- .element: class="center" -->

Note: So you twist the red knob and you get hot water.
In this analogy, you've just made a request to the API:
give me hot water, and out it pops. But this isn't the
water you want to wash your hands with, it'll burn.

---
<!-- .slide: class="content" -->

# Getting water

![](images/sink-cold.png)<!-- .element: class="big" -->
<!-- .element: class="center" -->

Note: You turn off the red knob and twist the blue one.
This time you've requested cold water from the "API",
and you have it. But this is too cold.

---
<!-- .slide: class="content" -->

# Getting water

![](images/sink-just-right.png)<!-- .element: class="big" -->
<!-- .element: class="center" -->

Note: You twist them both on a little bit and get exactly
the right temperature of water. APIs are like this. They
can have several different kinds of data available, and
they can let you mix and match to get exactly what it is
you need.

---
<!-- .slide: class="content four-dots" -->

# You don't have to care about the rest

You got the water you wanted without having to worry
about where it came from, how it was processed, how
it was pumped, what kind of plumbing it went through,
etc. You just turned a knob and there was water.

* ## Maintainability
  The water processing facility can be fixed without you
  having to replace your sink. Truly a win for the ages.

* ## Abstraction
  The city can change water sources or how they treat the
  water supply and you don't even have to know about it.

* ## Testable
  We can test the depth of the reservoir, the filtration
  of the treatment facility, and the pressure at your
  faucet, each independently.

* ## Independence
  Want to switch from well water to city water? You don't
  need a new faucet!
---
<!-- .slide: class="content" -->

## Data is like water, APIs are like taps

If you want to know the current yield on 30 year
treasuries, you can just ask for that. If you want
to know the temperature in Goofy Ridge, IL,
<span data-temperature></span> you can
find it without having to know how it was measured.
If you want to know where the International Space
Station is, you can look it up and you don't need to
know anything about astronomy.<!-- .element data-temperature -->

---
<!-- .slide: class="section" -->

# A real example

The National Weather Service operates an API that
provides access to over 10 million forecast points,
tens of thousands of current conditions, every
weather alert that gets published, and bunches more.
It receives tens of millions of requests every
single day.

[api.weather.gov](https://api.weather.gov/)

---
<!-- .slide: class="content" -->

# A real example

<iframe src="https://api.weather.gov" style="width: 80vw; height: 70vh;">
</iframe>

---
<!-- .slide: class="content" -->

# A real example

Current conditions in Goofy Ridge, IL:  
https://api.weather.gov/stations/KPIA/observations?limit=1

<pre class="code-wrapper"><code class="language-json" data-temperature-raw></code></pre>

---
<!-- .slide: class="section" -->

# APIs allow different systems to connect their data

A lot of work at STO revolves around taking data from two
or more systems and combining or reconciling them. But what
if those systems shared their data automatically so the
people could spend less time putting data together and more
time <em>using</em> that data?

---
<!-- .slide: class="content" -->

# Some STO systems

* 529 College Savings
* ABLE
* ADP
* Budget
* Community Invest
* Secure Choice
* Student Empowerment Fund
* Unclaimed Property

What if they shared data? The 529/UP program is bridging
two systems to make it easier for people to claim their
unclaimed property and put it to work.

What if the budget could automatically pull employee data
directly from ADP?

What if the various systems that track investments,
spending, budget, etc., could share their data? What
if a single audit system could pull that data at any
time and highlight discrepancies? What if the system
could pull the data automatically at regular intervals
and notify someone if anything is wonky?

---
<!-- .slide: class="title" -->

# What STO data
# could be connected?

---

<!-- .slide: class="title" -->
# Questions/discussion
