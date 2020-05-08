# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_08_191454) do

  create_table "fears", force: :cascade do |t|
    t.string "label"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "fears_users", id: false, force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "fear_id", null: false
    t.index ["fear_id", "user_id"], name: "index_fears_users_on_fear_id_and_user_id"
    t.index ["user_id", "fear_id"], name: "index_fears_users_on_user_id_and_fear_id"
  end

  create_table "flavors", force: :cascade do |t|
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "flavors_users", id: false, force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "flavor_id", null: false
    t.index ["flavor_id", "user_id"], name: "index_flavors_users_on_flavor_id_and_user_id"
    t.index ["user_id", "flavor_id"], name: "index_flavors_users_on_user_id_and_flavor_id"
  end

  create_table "things", force: :cascade do |t|
    t.text "description"
    t.boolean "private"
    t.string "kinda"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_things_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "role"
    t.string "secret"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.string "street_address"
    t.string "city"
    t.string "state"
    t.string "phone_number"
    t.string "six_paragraphs_of_text"
    t.string "avatar"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
