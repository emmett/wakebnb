json.array!(@boats) do |boat|
  json.partial!("boat", :boat => boat)
end