"""Симулятор для заполнения БД."""


import asyncio


class Simulator:
    """Основной класс симулятора."""

    async def run(self: "Simulator") -> None:
        """Основной цикл."""
        while True:
            print("123")
            await asyncio.sleep(1)


def main() -> None:
    """Точка входа."""
    sim = Simulator()
    asyncio.run(sim.run())


if __name__ == "__main__":
    main()
