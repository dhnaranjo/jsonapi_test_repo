# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
%w[
  Achluophobia
  Acrophobia
  Aerophobia
  Algophobia
  Alektorophobia
  Agoraphobia
  Aichmophobia
  Amaxophobia
  Androphobia
  Anginophobia
  Anthophobia
  Anthropophobia
  Aphenphosmphobia
  Arachnophobia
  Arithmophobia
  Astraphobia
  Ataxophobia
  Atelophobia
  Atychiphobia
  Autophobia
  Bacteriophobia
  Barophobia
  Bathmophobia
  Batrachophobia
  Belonephobia
  Bibliophobia
  Botanophobia
  Cacophobia
  Catagelophobia
  Catoptrophobia
  Chionophobia
  Chromophobia
  Chronomentrophobia
  Claustrophobia
  Coulrophobia
  Cyberphobia
  Cynophobia
  Dendrophobia
  Dentophobia
  Domatophobia
  Dystychiphobia
  Ecophobia
  Elurophobia
  Entomophobia
  Ephebiphobia
  Equinophobia
  Gamophobia
  Genuphobia
  Glossophobia
  Gynophobia
  Heliophobia
  Hemophobia
  Herpetophobia
  Hydrophobia
  Hypochondria
  Iatrophobia
  Insectophobia
  Koinoniphobia
  Leukophobia
  Lilapsophobia
  Lockiophobia
  Mageirocophobia
  Megalophobia
  Melanophobia
  Microphobia
  Mysophobia
  Necrophobia
  Noctiphobia
  Nosocomephobia
  Nyctophobia
  Obesophobia
  Octophobia
  Ombrophobia
  Ophidiophobia
  Ornithophobia
  Papyrophobia
  Pathophobia
  Pedophobia
  Philophobia
  Phobophobia
  Podophobia
  Pogonophobia
  Porphyrophobia
  Pteridophobia
  Pteromerhanophobia
  Pyrophobia
  Samhainophobia
  Scolionophobia
  Selenophobia
  Sociophobia
  Somniphobia
  Tachophobia
  Technophobia
  Tonitrophobia
  Trypanophobia
  Venustraphobia
  Verminophobia
  Wiccaphobia
  Xenophobia
  Zoophobia
].each { |fear| Fear.find_or_create_by(label: fear) }

%w[sweet sour bitter salty umami].each { |flavor| Flavor.find_or_create_by(description: flavor) }

FactoryBot.create(:user, email: "user@wow.hey", password: "wow")
FactoryBot.create(:user, :role_admin, email: "admin@wow.hey", password: "wow")
FactoryBot.create_list(:user, 98)
