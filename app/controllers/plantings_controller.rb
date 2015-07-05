class PlantingsController < ApplicationController
  def show
    @plantings = Planting.find(params[:id])
    if @plantings
      render :show
    else
      render json: ["No garden!"], status: 404
    end
  end

  def create
    @plantings = Planting.new(plantings_params)
    if @plantings.save
      render :show
    else
      render json: @plantings.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @plantings = Planting.find(params[:id])
    if @plantings.update(plantings_params)
      render :show
    else
      render json: @plantings.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    def plantings_params
      parameters = params.permit(:id, :column, :row, :garden_id, plant: [:id])
      parameters[:plant_id] = parameters[:plant][:id] if parameters[:plant]
      parameters.delete(:plant)
      parameters
    end
end
