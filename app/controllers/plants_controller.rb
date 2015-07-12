class PlantsController < ApplicationController
    def index
        @plants = Plant.all
    end

    def plants_params
        params.permit(:name)
    end
end
