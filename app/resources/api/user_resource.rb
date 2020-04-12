class Api::UserResource < JSONAPI::Resource
  attributes :email, :secret, :role
  
  has_many :flavors

  has_many :things, relation_name: -> (options = {}) {
    current_user = options.dig(:context, :current_user)
    if current_user&.admin?
      :things
    else
      :public_things
    end
  }

  filter :role, default: "user,admin"

  def fetchable_fields
    return super if context[:current_user].admin?
    super - %i[secret]
  end

  def self.sortable_fields(context)
    super + %i[created_at]
  end
end
