class Api::UserResource < JSONAPI::Resource
  attributes :email, :secret, :role, :name, :street_address, :city, :state, :phone_number, :six_paragraphs_of_text, :avatar, :created_at, :updated_at

  has_many :flavors
  has_many :fears

  has_many :things, relation_name: ->(options = {}) {
    current_user = options.dig(:context, :current_user)
    if current_user&.admin?
      :things
    else
      :public_things
    end
  }

  filters :email, :city, :state
  filter :role, default: "user,admin"

  def fetchable_fields
    return super if context[:current_user].admin?
    super - %i[secret]
  end
end
