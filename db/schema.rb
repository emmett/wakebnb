# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140731203258) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "boats", force: true do |t|
    t.integer  "user_id",                                                 null: false
    t.string   "title",                                                   null: false
    t.text     "description",             default: "Write a description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "boat_photo_file_name"
    t.string   "boat_photo_content_type"
    t.integer  "boat_photo_file_size"
    t.datetime "boat_photo_updated_at"
    t.float    "latitude",                                                null: false
    t.float    "longitude",                                               null: false
    t.integer  "price"
  end

  add_index "boats", ["latitude", "longitude"], name: "index_boats_on_latitude_and_longitude", using: :btree
  add_index "boats", ["price"], name: "index_boats_on_price", using: :btree
  add_index "boats", ["title"], name: "index_boats_on_title", using: :btree
  add_index "boats", ["user_id"], name: "index_boats_on_user_id", using: :btree

  create_table "profiles", force: true do |t|
    t.integer  "user_id",                                                   null: false
    t.text     "bio",          default: "Fill in some info about yourself"
    t.string   "location"
    t.integer  "review_score"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "profiles", ["location"], name: "index_profiles_on_location", using: :btree
  add_index "profiles", ["review_score"], name: "index_profiles_on_review_score", using: :btree
  add_index "profiles", ["user_id"], name: "index_profiles_on_user_id", unique: true, using: :btree

  create_table "reservations", force: true do |t|
    t.integer  "user_id",                    null: false
    t.integer  "boat_id",                    null: false
    t.date     "start_date",                 null: false
    t.date     "end_date",                   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "approved",   default: false
  end

  add_index "reservations", ["boat_id"], name: "index_reservations_on_boat_id", using: :btree
  add_index "reservations", ["start_date"], name: "index_reservations_on_start_date", using: :btree
  add_index "reservations", ["user_id"], name: "index_reservations_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",                   null: false
    t.string   "password_digest",            null: false
    t.string   "session"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "profile_photo_file_name"
    t.string   "profile_photo_content_type"
    t.integer  "profile_photo_file_size"
    t.datetime "profile_photo_updated_at"
  end

  add_index "users", ["session"], name: "index_users_on_session", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
