json.array! @plants do |plant|
    json.extract!(plant, :name, :id)
end
