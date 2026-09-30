# Add Maths 5.8 — Practical applications of exponential equations

Source section: Cambridge IGCSE and O Level Additional Mathematics coursebook (3rd
edition), section 5.8, pages 116–117. Read in the Cambridge GO reader on 2026-09-30.

Three parts: the beats of the notes in our own words, a map of the exercise's question
types, and a fresh problem set that covers every type, with answers. None of the
problems are the book's: every context and every number here is new. Every answer was
checked by script.

## Part 1 — The beats of the notes

1. **One sentence of introduction (p. 116).** Exponential equations model real
   situations.
2. **Worked example 14.** A cooling model of the form T = A e^(−kt) + c, with three
   parts that set the pattern for the whole exercise:
   - the value at the start (put t = 0 and use e⁰ = 1)
   - the value at a given time (substitute)
   - the time to reach a given value (rearrange to isolate the exponential, take ln of
     both sides, divide)

## Part 2 — What the exercise asks

Exercise 5.8 is on pages 116–117: six context questions.

| Type | Book question | The model | What it asks |
|---|---|---|---|
| A. Growth by a power | 1 | N = a × bᵗ | Value at a time; time to pass a threshold |
| B. Decay dated by year | 2 | P = a e^(−kn), n years after a stated date | Value at a later date; the year a level is first reached |
| C. Find the constant | 3 | V = a e^(−kt), with one data point | Find k; then the value at another time |
| D. Decay to a fraction | 4 | N = a e^(−kt) | Initial value; value at a time; time to fall to a fraction of the start |
| E. Growth, find the rate | 5 | V = a e^(kn), with one data point | Initial value; find the constant; time to double |
| F. Two data points | 6 | A = A₀ bⁿ, with two data points | Find b; find A₀ and say what it means; time to pass a threshold |

The worked example's model (an exponential plus a constant) does not appear in the
exercise, so it has its own type below.

## Part 3 — Fresh problems in the same style

Give answers correct to 3 significant figures unless told otherwise.

### W. The worked-example model

- W1. The temperature, T °C, of a bowl of soup t minutes after it is served is given by
  T = 60e^(−0.05t) + 22.
  1. Find the temperature when the soup is served.
  2. Find the temperature after 10 minutes.
  3. Find the value of t when T = 40.
  4. What temperature does the soup approach as time goes on? What might this number
     represent?

### A. Growth by a power

- A1. At the start of an experiment there are 250 yeast cells. After t hours the number
  of cells, N, is given by N = 250 × 3ᵗ.
  1. Estimate the number of cells after 4 hours.
  2. Estimate the time, in hours, for the number of cells to exceed 1 000 000.

### B. Decay dated by year

- B1. At the beginning of 2020 the population of a town was 80 000. After n years the
  population is 80 000e^(−0.02n).
  1. Estimate the population at the beginning of 2030.
  2. Estimate the year in which the population would first fall to 40 000.

### C. Find the constant

- C1. The mass, M grams, of a radioactive sample after t days is given by
  M = 120e^(−kt). When t = 10, M = 90.
  1. Find the value of k.
  2. Find the value of M when t = 25.

### D. Decay to a fraction

- D1. The amount, C mg, of a medicine in a patient's blood t hours after an injection is
  given by C = 40e^(−0.15t).
  1. Find the amount injected.
  2. Find the amount after 4 hours.
  3. Find how long it takes for the amount to fall to one quarter of the amount
     injected.

### E. Growth, find the rate

- E1. The value, $V, of a painting n years after it was bought is given by
  V = 12 000e^(an). When n = 5, V = 15 000.
  1. Find the price paid for the painting.
  2. Find the value of a.
  3. Estimate the number of years for the painting to double in value.

### F. Two data points

- F1. The area, A m², of a patch of algae is measured daily. After n days,
  A = A₀bⁿ. When n = 1, A = 3, and when n = 3, A = 12.
  1. Find the value of b.
  2. Find the value of A₀ and explain what it represents.
  3. Estimate the number of days for the area to exceed 100 m².

### G. Stretch (not in the book's exercise)

- G1. $5000 is invested at 4% per year, compounded once a year. After how many complete
  years is the investment first worth more than $8000?
- G2. A substance decays so that the amount left after t days is N = N₀e^(−kt). Its
  half-life is 8 days.
  1. Find k.
  2. Find the percentage of the substance left after 20 days.
- G3. Town A has population 5000e^(0.03t) and town B has population 8000e^(0.01t),
  where t is the number of years after 2020. After how many years are the two
  populations equal?

## Answers

**W.** W1 82 °C; 58.4 °C; e^(−0.05t) = 0.3, so t = 24.1; it approaches 22 °C, the
temperature of the room.

**A.** A1 250 × 81 = 20 250; 3ᵗ > 4000, so t > ln 4000 ÷ ln 3 = 7.55 hours.

**B.** B1 80 000e^(−0.2) = 65 500; e^(−0.02n) = 0.5 gives n = 34.7, so during 2054.

**C.** C1 e^(−10k) = 0.75, so k = ln (4/3) ÷ 10 = 0.0288; M = 58.5.

**D.** D1 40 mg; 22.0 mg; e^(−0.15t) = 0.25, so t = ln 4 ÷ 0.15 = 9.24 hours.

**E.** E1 $12 000; e^(5a) = 1.25, so a = 0.0446; t = ln 2 ÷ a = 15.5 years.

**F.** F1 Dividing the two equations gives b² = 4, so b = 2; A₀ = 1.5, the area in m²
when the measurements started; 2ⁿ > 66.7, so n > 6.06 days.

**G.** G1 1.04ⁿ > 1.6, so n > 11.98: after 12 years. G2 k = ln 2 ÷ 8 = 0.0866;
0.5^2.5 = 17.7%. G3 e^(0.02t) = 1.6, so t = 23.5 years.

## Notes for building

- This section is planned for `AM_5B`, with 5.5 and 5.7.
- Every question has the same three or four asks in the same order: start value, value
  at a time, find a constant, time to reach a level. That is a ready-made set of stages
  for a task.
- Answers that are years or whole days need a decision about rounding (B1 and G1). The
  book says "estimate the year"; mark schemes usually want the year or the next whole
  period. Say which in the question.
- These are long written questions, so they suit the workbook more than a quick-fire
  engine.
