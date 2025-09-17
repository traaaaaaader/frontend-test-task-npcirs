import { faker } from "@faker-js/faker";

function generateFamily() {
  return Array.from(
    { length: faker.number.int({ min: 0, max: 5 }) },
    () => ({
      fullName: faker.person.fullName(),
      relation: faker.helpers.arrayElement([
        "Жена",
        "Муж",
        "Сын",
        "Дочь",
        "Отец",
        "Мать",
      ]),
      birthDate: faker.date
        .birthdate({ min: 18, max: 70, mode: 'age' })
        .toISOString()
        .split("T")[0],
    })
  );
}

function generateEducation() {
  return Array.from(
    { length: faker.number.int({ min: 1, max: 3 }) },
    () => ({
      institution: faker.company.name(),
      degree: faker.helpers.arrayElement([
        "Среднее",
        "Среднее специальное",
        "Высшее",
        "Кандидат наук",
        "Доктор наук",
      ]),
      year: faker.date.past({ years: 30 }).getFullYear(),
    })
  );
}

function generateJobs() {
  return Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    () => ({
      company: faker.company.name(),
      position: faker.person.jobTitle(),
      startDate: faker.date.past({ years: 20 }).toISOString().split("T")[0],
      endDate: faker.helpers.maybe(
        () => faker.date.recent().toISOString().split("T")[0],
        { probability: 0.5 }
      ),
      salary: faker.number.int({ min: 20000, max: 250000 }),
    })
  );
}

function generateDocuments() {
  return {
    passport: faker.string.alphanumeric(10).toUpperCase(),
    inn: faker.number.int({ min: 100000000000, max: 999999999999 }).toString(),
    snils: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
    driverLicense: faker.string.alphanumeric(10).toUpperCase(),
  };
}

export function generateCitizen(id) {
  return {
    id,
    fullName: faker.person.fullName(),
    gender: faker.person.sex(),
    birthDate: faker.date
      .birthdate({ min: 18, max: 70, mode: 'age' })
      .toISOString()
      .split("T")[0],
    address: faker.location.city() + ", " + faker.location.streetAddress(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    job: faker.person.jobTitle(),
    educationLevel: faker.helpers.arrayElement([
      "Среднее",
      "Среднее специальное",
      "Высшее",
      "Кандидат наук",
      "Доктор наук",
    ]),
    maritalStatus: faker.helpers.arrayElement([
      "Холост/не замужем",
      "Женат/замужем",
      "Разведен",
      "Вдовец/вдова",
    ]),
    income: faker.number.int({ min: 15000, max: 500000 }),
    hobbies: faker.helpers.multiple(faker.word.noun, { count: 5 }),

    family: generateFamily(),
    education: generateEducation(),
    jobs: generateJobs(),
    documents: generateDocuments(),

    health: {
      bloodType: faker.helpers.arrayElement(["A", "B", "AB", "O"]),
      allergies: faker.helpers.multiple(faker.word.noun, { count: 3 }),
      chronicDiseases: faker.helpers.multiple(faker.word.noun, { count: 2 }),
    },
    fines: Array.from(
      { length: faker.number.int({ min: 0, max: 10 }) },
      () => ({
        type: faker.helpers.arrayElement([
          "ПДД",
          "Налоговая",
          "Административная",
        ]),
        amount: faker.number.int({ min: 500, max: 50000 }),
        date: faker.date.past().toISOString().split("T")[0],
      })
    ),
  };
}

export function generateCitizens(count = 1000) {
  return Array.from({ length: count }, (_, i) => generateCitizen(i + 1));
}
