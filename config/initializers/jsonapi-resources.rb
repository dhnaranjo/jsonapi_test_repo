JSONAPI.configure do |config|
  config.top_level_meta_include_record_count = true
  config.default_paginator = :paged
  config.default_page_size = 200
  config.maximum_page_size = 200
end
